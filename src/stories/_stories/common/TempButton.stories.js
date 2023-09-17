import TempButton from '../../../component/TempButton.js'; 

// This file is written by AutoDocs (not Storybook's addon)! 
// 담당자: 왕인서3 

const Meta = { 
	title: "common", 
	component: TempButton, 
	argTypes: { 
		content: { 
		 description: "버튼 컨텐츠" 
	 }
      ,variant: { 
		 description: "테마2" 
	 }
      ,color: { 
		 description: "색깔" 
	 }
      } 
} 

export default Meta; 

export const TempButtonStory = { 
	args: { 
		content:'example-value' 
		,variant:'example-value' 
		,color:'example-value' 
		 	} 
} 
