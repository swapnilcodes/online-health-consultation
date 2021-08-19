import "./covid-checker-style.css";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import logo from "./jeremy-bishop-G9i_plbfDgk-unsplash.jpg";
import ShowErr from "./ShowErr";
import ReactDOM from "react-dom";
import Message from "./showMessage";

const CovidTestChecker = () => {
  const submit = (e) => {
    e.preventDefault();
    var xhr = new XMLHttpRequest();

    var option_1 = document.querySelector(
      'input[name="question__1__option"]:checked'
    ).value;
    var option_2 = document.querySelector(
      'input[name="question__2__option"]:checked'
    ).value;
    var option_3 = document.querySelector(
      'input[name="question__3__option"]:checked'
    ).value;
    var option_4 = document.querySelector(
      'input[name="question__4__option"]:checked'
    ).value;
    var option_5 = document.querySelector(
      'input[name="question__5__option"]:checked'
    ).value;
    var option_6 = document.querySelector(
      'input[name="question__6__option"]:checked'
    ).value;
    var option_7 = document.querySelector(
      'input[name="question__7__option"]:checked'
    ).value;
    var option_8 = document.querySelector(
      'input[name="question__8__option"]:checked'
    ).value;
    var option_9 = document.querySelector(
      'input[name="question__9__option"]:checked'
    ).value;
    var option_10 = document.querySelector(
      'input[name="question__10__option"]:checked'
    ).value;
    var option_11 = document.querySelector(
      'input[name="question__11__option"]:checked'
    ).value;
    var option_11 = document.querySelector(
      'input[name="question__11__option"]:checked'
    ).value;
    var option_12 = document.querySelector(
      'input[name="question__12__option"]:checked'
    ).value;
    var option_13 = document.querySelector(
      'input[name="question__13__option"]:checked'
    ).value;
    var option_14 = document.querySelector(
      'input[name="question__14__option"]:checked'
    ).value;
    var option_15 = document.querySelector(
      'input[name="question__15__option"]:checked'
    ).value;
    var option_16 = document.querySelector(
      'input[name="question__16__option"]:checked'
    ).value;
    var option_17 = document.querySelector(
      'input[name="question__17__option"]:checked'
    ).value;
    var option_18 = document.querySelector(
      'input[name="question__18__option"]:checked'
    ).value;
    var option_19 = document.querySelector(
      'input[name="question__19__option"]:checked'
    ).value;
    var option_20 = document.querySelector(
      'input[name="question__20__option"]:checked'
    ).value;
    fetch(
      `/covid-test-checker-results?Breathing Problem=${[option_1]}&Fever=${[
        option_2,
      ]}&Dry Cough=${[option_3]}&Sore throat=${[option_4]}&Running Nose=${[
        option_5,
      ]}&Asthma=${[option_6]}&Chronic Lung Disease=${[option_7]}&Headache=${[
        option_8,
      ]}&Heart Disease=${[option_9]}&Diabetes=${[option_10]}&Hyper Tension=${[
        option_11,
      ]}&Fatigue=${[option_12]}&Gastrointestinal=${[
        option_13,
      ]}&Abroad travel=${[option_14]}&Contact with COVID Patient=${[
        option_15,
      ]}&Attended Large Gathering=${[
        option_16,
      ]}&Visited Public Exposed Places=${[
        option_17,
      ]}&Family working in Public Exposed Places=${[
        option_18,
      ]}&Wearing Masks=${[option_19]}&Sanitization from Market=${[option_20]}`,
      { method: "POST" }
    )
      .then((res) => res.json())
      .then((data) => {
        var prediction = data.predictions;
        if (prediction === "Yes") {
          window.scrollTo(0, 0);
          var message = "You need to Test for Covid-19!!!!!";
          const element = <ShowErr message={message} type="covid" />;
          document.querySelector(".App").innerHTML = "";
          ReactDOM.render(element, document.querySelector(".App"));
        } else {
          window.scrollTo(0, 0);
          var message = "Dont worry, you don't need to test for covid";
          const element = <Message message={message} />;
          document.querySelector(".App").innerHTML = "";
          ReactDOM.render(element, document.querySelector(".App"));
        }
      });
  };

  return (
    <div className="app__covid__checker">
      <img src={logo} alt="" className="large-background" />
      <h1 id="checker-heading">Do You Need To Test For Covid-19?</h1>
      <h3 id="checker-caption">Give the below quiz to Check</h3>
      <form method="POST" action="/covid-test-checker-results" id="quiz">
        <h4 className="question">Do you have Breathing Problem</h4>

        <div className="question-cont">
          <input
            type="radio"
            name="question__1__option"
            id="question__1__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__1__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__1__option"
            id="question__1__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__1__option" className="option__label">
            No
          </label>
        </div>
        <h4 className="question">Do you have Fever</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__2__option"
            id="question__2__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__2__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__2__option"
            id="question__2__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__2__option" className="option__label">
            No
          </label>
          <h4 className="question">Do you have Dry Cough</h4>
          <div className="question-cont">
            <input
              type="radio"
              name="question__3__option"
              id="question__3__option__1"
              className="option"
              value="Yes"
            />
            <label htmlFor="question__3__option" className="option__label">
              Yes
            </label>
            <input
              type="radio"
              name="question__3__option"
              id="question__3__option__2"
              className="option"
              value="No"
            />
            <label htmlFor="question__3__option" className="option__label">
              No
            </label>
          </div>
        </div>
        <h4 className="question">Do you have Sore throat</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__4__option"
            id="question__4__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__4__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__4__option"
            id="question__4__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__4__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">Do you have Running Nose</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__5__option"
            id="question__5__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__5__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__5__option"
            id="question__5__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__5__option" className="option__label">
            No
          </label>
        </div>
        <h4 className="question">Do you have Asthma</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__6__option"
            id="question__6__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__6__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__6__option"
            id="question__6__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__6__option" className="option__label">
            No
          </label>
        </div>
        <h4 className="question">Do you have Chronic Lung Disease</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__7__option"
            id="question__7__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__7__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__7__option"
            id="question__7__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__7__option" className="option__label">
            No
          </label>
        </div>
        <h4 className="question">Do you have Headache</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__8__option"
            id="question__8__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__8__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__8__option"
            id="question__8__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__8__option" className="option__label">
            No
          </label>
        </div>
        <h4 className="question">Do you have Heart Disease</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__9__option"
            id="question__9__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__9__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__9__option"
            id="question__9__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__9__option" className="option__label">
            No
          </label>
        </div>
        <h4 className="question">Do you have Diabetes</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__10__option"
            id="question__10__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__10__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__10__option"
            id="question__10__option__211"
            className="option"
            value="No"
          />
          <label htmlFor="question__10__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">Do you have Hyper Tension</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__11__option"
            id="question__11__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__11__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__11__option"
            id="question__11__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__11__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">Do you have Fatigue</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__12__option"
            id="question__12__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__12__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__12__option"
            id="question__12__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__12__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">Do you have Gastrointestinal </h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__13__option"
            id="question__13__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__13__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__13__option"
            id="question__13__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__13__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">Have you travelled abroad</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__14__option"
            id="question__14__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__14__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__14__option"
            id="question__14__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__14__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">did you had Contact with COVID Patient</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__15__option"
            id="question__15__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__15__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__15__option"
            id="question__15__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__15__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">
          have you Attended Large Gathering recently?
        </h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__16__option"
            id="question__16__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__16__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__16__option"
            id="question__16__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__16__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">
          have you Visited Public Exposed Places recently?
        </h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__17__option"
            id="question__17__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__17__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__17__option"
            id="question__17__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__17__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">
          Does your Family works in Public Exposed Places?
        </h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__18__option"
            id="question__18__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__18__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__18__option"
            id="question__18__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__18__option" className="option__label">
            No
          </label>
        </div>
        <h4 className="question">Do you wear masks?</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__19__option"
            id="question__19__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__19__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__19__option"
            id="question__19__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__19__option" className="option__label">
            No
          </label>
        </div>

        <h4 className="question">Do you have market sanitization?</h4>
        <div className="question-cont">
          <input
            type="radio"
            name="question__20__option"
            id="question__20__option__1"
            className="option"
            value="Yes"
          />
          <label htmlFor="question__20__option" className="option__label">
            Yes
          </label>
          <input
            type="radio"
            name="question__20__option"
            id="question__20__option__2"
            className="option"
            value="No"
          />
          <label htmlFor="question__20__option" className="option__label">
            No
          </label>
        </div>
        <input type="submit" value="SUBMIT" id="submit" onClick={submit} />
      </form>
    </div>
  );
};

export default CovidTestChecker;
