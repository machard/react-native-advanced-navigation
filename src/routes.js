import Route from './navigation/Route';
import Navigator from './navigation/Navigator';

import TabStack from './archi/TabStack';

import OnBoardingStep1 from './containers/OnBoarding/Step1';
import OnBoardingStep2 from './containers/OnBoarding/Step2';

import BindingExample from './containers/BindingExample';

import BigList from './containers/BigList/List';
import BigListDetail from './containers/BigList/Detail';

import NextPageStep1 from './containers/NextPage/Step1';
import NextPageStep2 from './containers/NextPage/Step2';

class OnBoardingStep1Route extends Route {
  SceneComponent = OnBoardingStep1;
}

class OnBoardingStep2Route extends Route {
  SceneComponent = OnBoardingStep2;
}

export class TabStackRoute extends Route {
  SceneComponent = TabStack;

  SceneConfig = {
    ...Navigator.SceneConfigs.PushFromRight,
    // we don't want to go back to onboarding
    gestures: {}
  };
}

class BindingExampleRoute extends Route {
  SceneComponent = BindingExample;
}

class BigListRoute extends Route {
  SceneComponent = BigList;
}
export class BigListDetailRoute extends Route {
  SceneComponent = BigListDetail;
}

class NextPageStep1Route extends Route {
  SceneComponent = NextPageStep1;
}
class NextPageStep2Route extends Route {
  SceneComponent = NextPageStep2;
}

export const onboardingstep1 = new OnBoardingStep1Route();
export const onboardingstep2 = new OnBoardingStep2Route();

export const bindingexample = new BindingExampleRoute();

export const biglist = new BigListRoute();

export const nextpagestep1 = new NextPageStep1Route();
export const nextpagestepsimple = new NextPageStep2Route();
export const nextpagestepsimplehidingtopbar = new NextPageStep2Route({topBar: false});
export const nextpagestepwithoutbottom = new NextPageStep2Route({navBar: false});
export const nextpagestepwithoutbottomhidingtopbar = new NextPageStep2Route({topBar: false, navBar: false});
