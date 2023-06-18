import React,{useState,useEffect, useContext} from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { AuthContext } from '../../store/Context';



function TimeComponent() {
    const [value, setValue] = useState(new Date());
//   const {user} = useContext(AuthContext)

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
        clearInterval(interval);
  };
  }, []);

  return(
      <div>
          <Clock value={value} renderNumbers={true}/>
      </div>
  )


}
  export default TimeComponent