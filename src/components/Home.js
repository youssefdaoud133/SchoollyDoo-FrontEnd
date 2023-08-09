import { useState } from "react";
// import { useRouter } from "next/router";
import axios from "axios";

// import NavBar from "../components/NavBar";

export default function Home() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    await axios.post(
      "http://localhost:8000/api/v1/users/uploadprofilepicture",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div>
      {/* <NavBar></NavBar> */}
      <div>
        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={submit}
            style={{ width: 650 }}
            className="flex flex-col space-y-5 px-5 py-14"
          >
            <input onChange={fileSelected} type="file" accept="image/*"></input>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              placeholder="Caption"
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div>
        <img src="https://schoolly-data.s3.eu-west-1.amazonaws.com/first-photo?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJGMEQCIGVNCobVnUDa40Ne7Dn1eMyiXKa9sgw4atdWrQOSeZ2iAiAIP%2F422Icw6TxPXzOszPJbrlkGWt25XBuW%2FnHak3v4HCrkAghjEAAaDDQ4NjEyMDI5NzkyNCIMZxR%2FrB%2F%2FeRg17jnBKsECp7yKLbvuuULOrriGpGBsPr5InCINc%2FXWF%2BDMspMHqHT5eUv%2Ft0LvzfSpaIxREesW3I10cRuHD%2Buny7wYC5gfWVgzDWcW371CC682vAN%2FCHGDOm7wswmWJ3LzhQzCMjgn6RQ857MLBGbyXysbhXKM5mlr4BfyTkg1Hr5G%2BDZrMlYy9atfrX1xdOt7gMq80k%2BxCyXnlpe6848vaZ3weEHzgqlJf%2BqzC1tDpzq4FVqpxSugR1oWIIbzaIXjygQwKjR6VYeWN%2FOwSN4RAw591sPlSbvUSkH7ZEKMth2WwN%2BHPaxgH58KmpB1aMOjkXHv5lOanG%2FmLMMqRgBjgX4q20SGlALINECu1FrswHPNcxT7xpP%2BVUkpIyw%2BVInEhmz1rkdgwMP20m8CYUNvlMEn15Gnwks4XnoH2yjMthBvyjRZvGxMMMWwv6YGOrQCT6nwaDEoW2qDhfIUkczVpQDhUrk5fQaqr3d2hyoa41s2ZLK356J6LgK8nAG%2B67K19AlQFWbuM6hZKpKSXfcXfof22gpUK1V9qe0o4BgWb9VjAOY9IBvFResCbsqsKMaukzEo73DU5%2F377TwqNgpcPX14UsBe1az8AVHCwU%2FZ5kV0OTbmSEvIyu6VREXRJDf0SnXx6j4FlsEl%2BNact31Re3WPs5h%2BQ%2FED2RPDHKXZzj27PJNCe7PbMaldDxd97l3P%2BrIzUYc7MckQqMtwDB%2F12DKYFs39RUENpDmMkjT4fn62Ji2MBM0DESePUdJ0C8Eum0f2L4hBuFTF%2B39r6mnfKHCTHL%2FhhoismXwvGmu1pb8etk%2BHq9EGF%2BLcns%2BlQ0j0zquiTQXg1Gqr8VRQRGHPWxcGNa8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230806T231048Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXCLYHCXCEON5YS6I%2F20230806%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=8234d780cfbeccd60d1e0cd2886c90ced548170f22d984cb8b830c6f2fbe0e73"></img>
      </div>
    </div>
  );
}
