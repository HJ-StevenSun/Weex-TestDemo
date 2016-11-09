//
//  QRCode_ViewController.h
//  8.12代码整合
//
//  Created by kw on 16/8/12.
//  Copyright © 2016年 kw. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void (^ScanerData)(NSString *Data);

@interface QRCode_ViewController : UIViewController

@property (nonatomic, copy) ScanerData Scan;
@end
