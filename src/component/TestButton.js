import { Button } from '@mui/material';

// #author - 우동현23
// #title - common
// #prop - content: 컨텐츠, data: 데이터, color:색깔
const TestButton = (prop) => {
  const { content, data } = prop;
  return (
    <Button variant="contained">
      {content ?? "text"}
    </Button>
  )
}

export default TestButton;