import React from "react";

export default function Card() {
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img src="https://img.freepik.com/free-photo/waffle_95678-4.jpg?q=10&h=200" height={200} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is some important text.</p>
            <div className="container w-100">
              {/* Creating a dropdown for quantity*/}
              <select className="m-2 h-100 bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              {/* Creating a dropdown for size i.e pizza*/}
              <select className="m-2 h-100 bg-success rounded">
                <option key={1} value="half">
                  Half
                </option>
                <option key={2} value="full">
                  Full
                </option>
              </select>

              <div className="d-inline h-100 fs-5">Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
