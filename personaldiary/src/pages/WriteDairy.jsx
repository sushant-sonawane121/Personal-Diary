import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WriteDairy.css";

const WriteDairy = () => {
  let navigate = useNavigate();

  const user = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  const [xPos, setXpos] = useState("");
  const [yPos, setYpos] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");

  // text area value
  const [textareaValue, setTextareaValue] = useState("");
  const [diaryData, setDiaryData] = useState({
    title: "",
    description: "",
  });

  const calculateCord = (e) => {
    setXpos(`X: ${e.clientX}`);
    setYpos(`Y: ${e.clientY}`);
  };

  const calculateRowCol = (e) => {
    let content = e.target.value;
    let createPos = e.target.selectionStart;

    setTextareaValue(e.target.value);

    let lineNumber =
      (content.substring(0, createPos).match(/\n/g) || []).length + 1;
    let columnNumber = createPos - content.lastIndexOf("\n", createPos - 1);

    setRow(`Ln: ${lineNumber}`);
    setCol(`Col: ${columnNumber}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiaryData((prevDiaryData) => ({
      ...prevDiaryData,
      [name]: value,
    }));
  };

  const addtoDiary = async () => {
    // console.log(diaryData.title);
    try {
      const response = await fetch(
        `http://localhost:8000/addDiaryPage/${user}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(diaryData),
        }
      );

      if (!response.ok) {
        throw new Error("Diary page not added");
      } else {
        alert("page added Successfuly");
        setDiaryData({
          title: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("page uploading error", error.message);
    }
  };

  return (
    <>
      <section className="wd-section">
        {/* code for header start */}

        <ul className="wd-ul">
          <li>
            <button className="nav-link fs-5" onClick={addtoDiary}>
              Add Page
            </button>
          </li>
          <li>
            <a className="nav-link fs-5" href="#">
              Close
            </a>
          </li>
        </ul>

        {/* code for header end */}
        <div className="text-area-container">
          <input
            type="text"
            name="title"
            id="title"
            value={diaryData.title}
            className="page-title"
            placeholder="Your Page Title here"
            autoFocus={true}
            onChange={handleChange}
          />
          <textarea
            name="description"
            id="textarea"
            cols="10"
            rows="10"
            onMouseMove={calculateCord}
            onInput={calculateRowCol}
            value={diaryData.description}
            placeholder="Write Your Diary page form here"
            onChange={handleChange}
          ></textarea>
        </div>
        <footer>
          <div className="pos-info d-flex gap-4 ps-4">
            <div className="mouse-pos">
              <p>
                <span className="text-white" id="x-pos">
                  {xPos}{" "}
                </span>{" "}
                |{" "}
                <span className="text-white" id="y-pos">
                  {yPos}
                </span>
              </p>
            </div>
            <div>
              <p className="text-white">|</p>
            </div>
            <div className="line-col">
              <p>
                <span className="text-white" id="linenum">
                  {row}
                </span>{" "}
                |{" "}
                <span className="text-white" id="colnum">
                  {col}
                </span>
              </p>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};
export default WriteDairy;
