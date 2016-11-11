package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Font_Size extends TestFlow {
	public AG_Input_Input_Font_Size() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Font_Size");
		testMap.put("step1",new HashMap(){
			{
				put("click", "20");
				put("screenshot", "AG_Input_Input_Font_Size_01_20");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "40");
				put("screenshot", "AG_Input_Input_Font_Size_02_40");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
