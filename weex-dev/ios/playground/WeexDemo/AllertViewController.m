//
//  AllertViewController.m
//  8.12代码整合
//
//  Created by kw on 16/8/16.
//  Copyright © 2016年 kw. All rights reserved.
//

#import "AllertViewController.h"

@interface AllertViewController ()
@property (weak, nonatomic) IBOutlet UILabel *SSIDLabel;
@property (weak, nonatomic) IBOutlet UILabel *PassWordLabel;
@property (weak, nonatomic) IBOutlet UIButton *SetWifiBtn;
@property (weak, nonatomic) IBOutlet UIButton *SetSuccessBtn;

@end

@implementation AllertViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    self.SSIDLabel.text = self.SSID;
    self.PassWordLabel.text = self.PassWord;
    
    self.navigationItem.leftBarButtonItem =[[UIBarButtonItem alloc]initWithTitle:@"返回" style:UIBarButtonItemStyleDone target:self action:@selector(PoPtoRootVC)];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(void)PoPtoRootVC{

    [self.navigationController popToRootViewControllerAnimated:YES];
}
- (IBAction)GoSettingCenter:(id)sender {
    
    NSURL *url =[NSURL URLWithString:@"prefs:root=WIFI"];
    if ([[UIApplication sharedApplication] canOpenURL:url])
    {
        [[UIApplication sharedApplication] openURL:url];
    }

}
- (IBAction)GoControlCenter:(id)sender {
    
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
