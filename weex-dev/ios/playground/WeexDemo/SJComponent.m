//
//  SJComponent.m
//  WeexDemo
//
//  Created by kw on 16/8/24.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import "SJComponent.h"
@interface SJComponent ()
@property (nonatomic, strong) NSString *imageSrc;
//@property (nonatomic, assign) UIViewContentMode resizeMode;
@property (nonatomic, strong) UIImageView *SJImageView;
@end
@implementation SJComponent
-(instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _imageSrc = [WXConvert NSString:attributes[@"src"]];
       //_resizeMode = [WXConvert UIViewContentMode:attributes[@"resize"]];
    }
    return self;
}
-(void)viewDidLoad
{
    _SJImageView = [[UIImageView alloc]initWithFrame:CGRectMake(0, 500, 300, 200)];
    
    _SJImageView.backgroundColor = [UIColor cyanColor];

}
-(UIView *)loadView
{
   return _SJImageView;
}

@end
