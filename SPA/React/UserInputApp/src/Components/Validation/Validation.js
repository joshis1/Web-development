import styles from './Validation.module.css';

const Validation = (props) => {

    const validationModalHandler = () => {
        console.log("Validation Ok handler");
        props.valdiationOk();
    }

    return (
      <div className={`${styles["card"]}`}>
        <div className={`${styles["containerValidHeader"]}`}>
          <label htmlFor="invalid_title">Invalid input</label>
        </div>
        <div className={`${styles["containerMessageValidator"]}`}>
          <label htmlFor="message">{props.children}</label>
        </div>

        <div className={`${styles["myvalidbtn"]}`}>
          <button type="submit" onClick={validationModalHandler}>Okay</button>
        </div>
      </div>
    );


};

export default Validation;