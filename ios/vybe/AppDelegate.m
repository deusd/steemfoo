/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AppAuth/AppAuth.h>
#import "SplashScreen.h"

@import HockeySDK;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[BITHockeyManager sharedHockeyManager] configureWithIdentifier:@"7ba7b1892c4945b295644c820eba0879"];
  // Do some additional configuration if needed here
  [[BITHockeyManager sharedHockeyManager] startManager];
  [[BITHockeyManager sharedHockeyManager].authenticator
   authenticateInstallation];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"vybe"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [SplashScreen show];
  return YES;
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
  if ([_currentAuthorizationFlow resumeAuthorizationFlowWithURL:url]) {
    _currentAuthorizationFlow = nil;
    return YES;
  }
  return NO;
}

@end
