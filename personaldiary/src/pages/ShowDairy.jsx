import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ShowDairy = () => {
  let navigate = useNavigate();

  const user = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]); // Make sure to include user and navigate in the dependency array

  const [diaryEntries, setDiaryEntries] = useState([]);

  const fetchDiary = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getPages/${user}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDiaryEntries(data); // Update the diary entries state
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  const deletePage = async (id) => {
    const response = await fetch(
      `http://localhost:8000/deletePage/${user}/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    fetchDiary();
  }, [user, deletePage]); // Include user in the dependency array to re-fetch diary entries when user changes

  return (
    <>
      <div className="container">
        <h2 className="text-success py-2">Your Dairy Pages</h2>
        <div className="row">
          {diaryEntries.map((entry) => (
            <div className="col-md-4 border-success mb-2" key={entry._id}>
              <div className="card mb-4 h-100">
                <div className="card-body">
                  <h5 className="card-title">{entry.title}</h5>
                  <p className="card-text">{entry.description}</p>
                  <p className="card-text">
                    Date:{" "}
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="card-footer">
                  {entry.title == "Cover Page" ? (
                    <button className="btn btn-danger btn-block disabled">
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-block"
                      onClick={() => {
                        deletePage(entry._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowDairy;
