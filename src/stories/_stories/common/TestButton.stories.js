import TestButton from '../../../component/TestButton.js'; 

// This file is written by AutoDocs (not Storybook's addon)! 
// 담당자: 우동현23 

const Meta = { 
	title: "common", 
	component: TestButton, 
	argTypes: { 
		content: { 
		 description: "컨텐츠" 
	 }
      ,data: { 
		 description: "데이터" 
	 }
      ,color: { 
		 description: "색깔" 
	 }
      } 
} 

export default Meta; 

export const TestButtonStory = { 
	args: { 
		content:'example-value' 
		,data:'example-value' 
		,color:'example-value' 
		 	} 
} 
