import Widget from 'rasa-webchat';
import './bot.css';

function CustomWidget  () {
  

  // Bugfix in order to get the Enter Key working
  const handleKeyDown = (event) => {
    console.log(event.keyCode)
    if (event.keyCode === 13 ) { 
      try {
        // @ts-ignore
        // eslint-disable-next-line
        console.log("hi")
        event.preventDefault();
        document.querySelector(".rw-send").click();
        
        return false  
      } 
      catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
    <Widget
      initPayload={"hi"}
      socketUrl={"http://localhost:5005"}
   	// socketPath={"/socket.io/"}
      customData={{"language": "en"}} // arbitrary custom data. Stay minimal as this will be added to the socket
      title={"MediLine Chatbot"}
      subtitle={"Healthcare Chatbot"}
      inputTextFieldHint={"Type a message"}
     
  
    />
    
    </div>
  )
}
export default CustomWidget
