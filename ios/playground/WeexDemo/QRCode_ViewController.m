//
//  QRCode_ViewController.m
//  8.12代码整合
//
//  Created by kw on 16/8/12.
//  Copyright © 2016年 kw. All rights reserved.
//

#import "QRCode_ViewController.h"
#import <AVFoundation/AVFoundation.h>
#import "AllertViewController.h"

#define kScreenWidth [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height

#define kWidth 210
#define kHeight 210
#define kLineHeight 3
static NSString * const iP =@"192.168.43.1";
static NSString * const Port =@"30000";

@interface QRCode_ViewController ()<AVCaptureMetadataOutputObjectsDelegate>
{
    SystemSoundID _id;
    
    NSString *iP;
    NSString *PORT;
}
@property (nonatomic, weak) AVCaptureSession *session;
@property (nonatomic, weak) AVCaptureVideoPreviewLayer *layer;
@end

@implementation QRCode_ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    /*准备扫描图层*/
    //x,y互换,width,height互换
    CGFloat sx = kScreenWidth / 2 - (kWidth / 2);
    CGFloat sy = kScreenHeight / 2 - (kHeight  / 2);
    //设置mask图层
    [self addMaskToX:sx y:sy width:kWidth height:kHeight];
    //添加镂空窗口,用来显示扫描区域
    [self addMaskWindowToX:sx y:sy width:kWidth height:kHeight];
    
    //__bridge 桥接对象 toll free
    //CF core foundation
    //CFStringRef
    //NSString --> NSCFString  c/c++
    //NSDictionary --> NSCFDictionary
    //设置扫描成功后的声音,声音不能超过30秒
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"msgTritone" withExtension:@"caf"];
    AudioServicesCreateSystemSoundID((__bridge CFURLRef)(url), &_id);
    
    //1. 创建捕捉会话
    AVCaptureSession *session = [[AVCaptureSession alloc]init];
    [session setSessionPreset:AVCaptureSessionPresetHigh];

    self.session =session;
    
    //2.添加输入设备 （数据从摄像头输入）
    AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:device error:nil];
    
    //设置输入端
    if ([session canAddInput:input]) {
        [session addInput:input];
    }
    //3.添加输出数据
    AVCaptureMetadataOutput *output = [[AVCaptureMetadataOutput alloc] init];
    [output setMetadataObjectsDelegate:self queue:dispatch_get_main_queue()];
    
    //设置输出端
    if ([session canAddOutput:output]) {
        [session addOutput:output];
        
        //3.1设置输入元数据的类型（类型是二维码数据）
        [output setMetadataObjectTypes:@[AVMetadataObjectTypeQRCode]];
        //设置扫描的位置
        output.rectOfInterest = CGRectMake(sy / kScreenHeight,
                                           sx / kScreenWidth,
                                           200 / kScreenHeight,
                                           200 / kScreenWidth);
    }
    
    
    //4.添加扫描图层
    
    AVCaptureVideoPreviewLayer *layer = [[AVCaptureVideoPreviewLayer alloc] initWithSession:session];
    
    //设置拉伸模式
    [layer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
    
    //设置大小
    layer.frame = self.view.bounds;
    [self.view.layer addSublayer:layer];
    
    //添加图层
    [self.view.layer insertSublayer:layer atIndex:0];
    
    //5.开始扫描
    [session startRunning];
    
}
#pragma mark -实现output的回调方法

/*当扫描到数据的时候就会执行该方法*/
-(void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection
{
        if ( metadataObjects.count > 0) {
            
            
         AudioServicesPlaySystemSound(_id);//播放声音，声音只需要记载一次即可.
            
        //获取结果
        AVMetadataMachineReadableCodeObject *object = [metadataObjects lastObject];
        
            NSString *url = object.stringValue;
            
            NSArray *a = [url componentsSeparatedByString:@"&"];
            
            NSArray *IP = [url componentsSeparatedByString:@"/"];
            
            self.Scan(url);
            
            NSLog(@"%@",[IP objectAtIndex:2]);
        /*将IP 地址存储*/
            NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
            
            [user setObject:[IP objectAtIndex:2] forKey:@"IP"];
            
            
            NSMutableArray *arr = [[NSMutableArray alloc]init];
            for (NSInteger i=1; i<a.count; i++)
            {
                NSString *str = a[i];
                
                NSArray *b =[str componentsSeparatedByString:@"="];
                
                NSString *NewStr=[b lastObject];
                
                [arr addObject:NewStr];
                
            }
            NSLog(@"%@",arr);
        
            
        
        UIStoryboard *Storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
            
        AllertViewController *alertVC = [Storyboard instantiateViewControllerWithIdentifier:@"AlertVC"];
        /*正向传值过去*/
        if (arr.count>2)
        {
                alertVC.SSID = arr[0];
                alertVC.PassWord =arr[1];
        }
        
        
        [self.navigationController pushViewController:alertVC animated:YES];
       

        
                
        [self.session stopRunning];

        //将预览图层移除
        [self.layer removeFromSuperlayer];
    }
    else
    {
        NSLog(@"没有扫描到数据");
        UIAlertView *alert=[[UIAlertView alloc]initWithTitle:@"" message:@"没有扫描到数据" delegate:self cancelButtonTitle:@"确定" otherButtonTitles:@"", nil];
        [alert show];
    }
    
    
}

- (void)addMaskWindowToX:(CGFloat)x y:(CGFloat)y width:(CGFloat)width height:(CGFloat)height
{
    UIView *detail = [[UIView alloc] initWithFrame:CGRectMake(x, y, height, width)];
    
    detail.backgroundColor = [UIColor clearColor];
    detail.layer.borderWidth = 1;
    //detail.layer.borderColor = [[UIColor redColor] CGColor];
    
    UIImageView *kuang =[[UIImageView alloc]initWithImage:[UIImage imageNamed:@"SaoMiaoKuang"]];
    
    kuang.frame =CGRectMake(0, 0, height, width);
    
    [detail addSubview:kuang];
    
    [self.view addSubview:detail];
    
//    UIView *line = [[UIView alloc] initWithFrame:CGRectMake(0, 0, width, kLineHeight)];
//    
//    line.backgroundColor = [UIColor redColor];
//    
//    [detail addSubview:line];
    UIImageView *line =[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, width, kLineHeight)];
    line.image = [UIImage imageNamed:@"SaoMiaoLine"];
    
    [detail addSubview:line];
    
    //中间扫描线的动画
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:3];
    [UIView setAnimationRepeatCount:99999];
    [UIView setAnimationRepeatAutoreverses:YES];
    
    line.frame = CGRectMake(0, kHeight - kLineHeight, kWidth, kLineHeight);
    
    [UIView commitAnimations];
}

- (void)addMaskToX:(CGFloat)x y:(CGFloat)y width:(CGFloat)width height:(CGFloat)height
{
    
    
    UIView * _maskView = [[UIView alloc] init];
    [_maskView setFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    [_maskView setBackgroundColor:[UIColor colorWithWhite:0 alpha:0.4]];
    [self.view addSubview:_maskView];
    
    
    //create pathk
    //贝塞尔曲线
    //UIBezierPath *path = [UIBezierPath bezierPathWithRect:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    UIBezierPath *path = [UIBezierPath bezierPathWithRect:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];

    
    [path appendPath:[[UIBezierPath bezierPathWithRect:CGRectMake(x, y, width, height)] bezierPathByReversingPath]];
    
    
    
    CAShapeLayer *shapeLayer = [CAShapeLayer layer];
    
    shapeLayer.path = path.CGPath;
    
    //图层蒙版
    [_maskView.layer setMask:shapeLayer];
    
    //    [self.view sendSubviewToBack:_maskView];
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
