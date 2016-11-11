package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Image_Image_Resize extends TestFlow {
	public AG_Image_Image_Resize() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Image");
		testMap.put("testChildCaseInit", "AG_Image_Image_Resize");
		testMap.put("step1",new HashMap(){
			{
				put("click", "stretch");
				put("screenshot", "AG_Image_Image_Resize_01_stretch");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "cover");
				put("screenshot", "AG_Image_Image_Resize_02_cover");
			}
		});
		testMap.put("step3",new HashMap(){
			{
				put("click", "contain");
				put("screenshot", "AG_Image_Image_Resize_03_contain");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
