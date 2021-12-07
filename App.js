import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

function App() {
    return (
        <div>
            <div class="container">
                <br />
                <br />
                <h1 style="text-align: center;">Media Converter App</h1>
                <div class="form-group">
                    <label for="format">Select Format:</label>
                    <select id="format" class="form-control">
                        <option>mp3</option>
                        <option>avi</option>
                        <option>flv</option>
                        <option>mp4</option>
                    </select>
                </div>
                <br />
                <button id="upload" class="btn btn-block btn-danger">
                    Select File & Convert
                </button>
                <div id="info"></div>
            </div>
        </div>
    );
}