import styles from "../Output/Output.module.css";


const Output = (props) => {

    
    //console.log("SJ", props.userList);
    return( <div className={`${styles["container"]}`}>
              {props.userList.map( (usr) => {
       let resultVal = usr.user + ' (' + usr.age + ' years old)';
       return (
           <input type="text" name="result" id="result" value={resultVal} key={usr.id} readOnly/>
       );
    }
    )} </div>);
}

export default Output;
