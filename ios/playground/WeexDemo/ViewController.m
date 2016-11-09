//
//  ViewController.m
//  登录界面
//
//  Created by kw on 16/8/10.
//  Copyright © 2016年 kw. All rights reserved.
//
#import "ViewController.h"
#import "WXDemoViewController.h"
#if TARGET_IPHONE_SIMULATOR
#define DEMO_HOST @"127.0.0.1"
#else
#define DEMO_HOST CURRENT_IP
#endif
#define HOME_URL [NSString stringWithFormat:@"http://%@:12580/examples/build/index.js", DEMO_HOST]
@interface ViewController ()


@property (weak, nonatomic) IBOutlet UITextField *iP;
@property (weak, nonatomic) IBOutlet UITextField *Pt;
@property (weak, nonatomic) IBOutlet UITextField *url;

@end

@implementation ViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    if ([[NSUserDefaults standardUserDefaults]objectForKey:@"IP"]) {
        NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
        
        _iP.text=[user objectForKey:@"IP"];
        _Pt.text=[user objectForKey:@"PORT"];
        _url.text=[user objectForKey:@"URL"];
    }
    //注册键盘响应时间的方法
    [_iP addTarget:self action:@selector(nextOnKeyboard:) forControlEvents:UIControlEventEditingDidEndOnExit];
    
    
   
}

#pragma mark -----隐藏键盘
- (void)hideKeyBoard
{
    [_iP resignFirstResponder];
    [_Pt resignFirstResponder];
    [_url resignFirstResponder];

}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self hideKeyBoard];
}
- (void)nextOnKeyboard:(UITextField *)sender
{
    if (sender == _iP) {
        [_Pt becomeFirstResponder];
    }else if (sender == _Pt){
        [self hideKeyBoard];
    }else if (sender == _url){
        [self hideKeyBoard];
    }
}
- (IBAction)nextVC:(id)sender {
    //BController *bc=[[BController alloc]init];
    
    /*存储输入的ip port url*/
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    [user setObject:self.iP.text forKey:@"IP"];
    [user setObject:self.Pt.text forKey:@"PORT"];
    [user setObject:self.url.text forKey:@"URL"];
    
    /*跳转到下一个控制器*/
    UIViewController *demo=[[WXDemoViewController alloc]init];
    
    NSString *Newurl = [[NSString alloc]init];
    Newurl = [NSString stringWithFormat:@"http://%@:%@%@",_iP.text,_Pt.text,_url.text];
    
    ((WXDemoViewController *)demo).url = [NSURL URLWithString:Newurl];

    
    [self.navigationController pushViewController:demo animated:YES];

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
