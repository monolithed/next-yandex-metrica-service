# next-yandex-metrica-service

Yandex Metrica integration for Next.js (App Directory)

## Usage

```shell
npm i next-yandex-metrica-service
```

## Usage

### Add the provider

To enable analytics, include `YandexMetricaProvider` in the custom [`app`](https://nextjs.org/docs/advanced-features/custom-app) component.

```jsx
import {YandexMetricaProvider, LoadStrategies} from 'next-yandex-metrica-service';

const App = ({children}) => (
    <YandexMetricaProvider tagID={NEXT_PUBLIC_YANDEX_METRICA_ID}
                           strategy={LoadStrategies.AFTER_INTERACTIVE}                       
                           initParameters={{
                               clickmap: true, 
                               trackLinks: true,
                               accurateTrackBounce: true
    }}>
        {children}
    </YandexMetricaProvider>
);
```

### Loading strategies

```ts
enum LoadStrategies {
    AFTER_INTERACTIVE = 'afterInteractive',
    LAZY_ONLOAD = 'lazyOnload',
    BEFORE_INTERACTIVE = 'beforeInteractive',
    WORKER = 'worker'
}
```

#### `YandexMetricaProvider` Props

| Name                      | Description                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `tagID`                   | Yandex.Metrica tag ID.                                                                                                               |
| `strategy`                | [next/script](https://nextjs.org/docs/api-reference/next/script#strategy) loading strategy. Defaults to `afterInteractive`.          |
| `initParameters`          | Yandex.Metrica tag [initialization parameters](https://yandex.com/support/metrica/code/counter-initialize.html).                     |
| `shouldUseAlternativeCDN` | Use the [alternative CDN](https://yandex.ru/support/metrica/general/counter-general.html?lang=en#other__cdn) to load Yandex.Metrica. |

Yandex.Metrica tag ID is read from the `tagID` property and the `NEXT_PUBLIC_YANDEX_METRICA_ID` environment variable. If both are set, the provider property takes priority.

### Send events

The package provides `useYandexMetrica` hook for sending custom analytics events.

```jsx
import {useYandexMetrica} from 'next-yandex-metrica-service';

type Props = {
    goal: string;
};

const ActionButton: React.FunctionComponent<Props> = ({goal}) => {
    const {reachGoal} = useYandexMetrica();

    return (
        <button type="button" onClick={() => reachGoal(goal)}>
            CTA
        </button>
    );
}
```
#### Exported events

* notBounce
* reachGoal
* setUserID
* userParams
* ymEvent


The returned functions accept the same parameters as those found in the [Yandex.Metrica object methods](https://yandex.com/support/metrica/objects/method-reference.html).

All functions are automatically provided with the tag ID that is supplied to the provider or the environment variable. `useMetrica` hook exposes functions for calling `notBounce`, `reachGoal`, `setUserID`, and `userParams` without specifying the event name. Other methods can be called using the `ymEvent` function, with the event name as the first argument. In both cases, all event parameters are type-checked.

```jsx
import {
    type ExtLinkEventParameters,
    YandexMetricaEvents,
    useYandexMetrica
} from 'next-yandex-metrica-service';

const ActionButton = () => {
    const {ymEvent} = useYandexMetrica();

    const handleExternalLinkClick = () => {
        ymEvent<ExtLinkEventParameters>(YandexMetricaEvents.EXT_LINK, 'https://www.google.com');
    };
}
```

In case if you need to use the Yandex.Metrica object directly, you can access it using the `ym` property.

```jsx
import type React from 'react';
import {
    type ReachGoalEventParameters,
    YandexMetricaEvents,
    ym
} from 'next-yandex-metrica-service';

type Props = {
    goal: string;
};

const ActionButton: React.FunctionComponent<Props> = ({goal}) => {
    return (
        <button type="button" onClick={() => {
            ym<ReachGoalEventParameters>(NEXT_PUBLIC_YANDEX_METRICA_ID, YandexMetricaEvents.REACH_GOAL, goal)
        }}>
            CTA
        </button>
    );
}
```

Available events:

```ts
const enum YandexMetricaEvents {
    HIT = 'hit',
    INIT = 'init',
    FILE = 'file',
    ADD_FILE_EXTENSION = 'addFileExtension',
    GET_CLIENT_ID = 'getClientID',
    NOT_BOUNCE = 'notBounce',
    FIRST_PARTY_PARAMS = 'firstPartyParams',
    EXT_LINK = 'extLink',
    REACH_GOAL = 'reachGoal',
    SET_USER_ID = 'setUserID',
    PARAMS = 'params',
    USER_PARAMS = 'userParams'
}
```

Available param types:

```ts
export type {
    YandexMetricaEventParameters,
    InitEventParameters,
    AddFileExtensionEventParameters,
    ExtLinkEventParameters,
    FileEventParameters,
    FirstPartyParamsEventParameters,
    GetClientIDEventParameters,
    HitEventParameters,
    NotBounceEventParameters,
    ParamsEventParameters,
    ReachGoalEventParameters,
    SetUserIDEventParameters,
    UserParamsEventParameters
};
```

### Check the tracking counters

```ts
// @see https://yandex.ru/support/metrica/ru/general/check-counter.html
//
// ?_ym_status-check=101579183&_ym_lang=ru
//. ?_ym_debug=1
//
// const reachGoal = (goal: string): void => {
//     ym(NEXT_PUBLIC_YANDEX_METRICA_ID, YandexMetricaEvents.REACH_GOAL, goal);
// };
```
