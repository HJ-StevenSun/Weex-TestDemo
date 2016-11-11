/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXEventModule.h"
#import "WXDemoViewController.h"
#import <WeexSDK/WXBaseViewController.h>
#import "QRCode_ViewController.h"
#import "WXDemoViewController.h"
@implementation WXEventModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(openURL:))
WX_EXPORT_METHOD(@selector(showAlert))
WX_EXPORT_METHOD(@selector(QRScan:callback:))


- (void)openURL:(NSString *)url
{
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if (![url hasPrefix:@"http"]) {
        // relative path
        newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
    }
    
    UIViewController *controller = [[WXDemoViewController alloc] init];
    ((WXDemoViewController *)controller).url = [NSURL URLWithString:newURL];
    
    [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
}
-(void)showAlert
{
    UIAlertView *alert=[[UIAlertView alloc]initWithTitle:@"hello" message:@"hello" delegate:self cancelButtonTitle:@"hello" otherButtonTitles:nil, nil];
    
    [alert show];
    [_delegate PushToQRView];
}
- (void)QRScan:(NSString *)url callback:(WXModuleCallback)callback
{
    
    
    
    QRCode_ViewController *qrcode =[[QRCode_ViewController alloc]init];
    /*Block回调*/
    qrcode.Scan=^(NSString *data){
        
        callback(@{@"result":@"222"});
        
     
    };

}
@end

