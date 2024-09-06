import React from "react";
import "./contact.css";
import msg_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);

    const response = await fetch("https://formspree.io/f/xovabkvr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        phone: formData.get("phone"),
        message: formData.get("message"),
      }),
    });

    if (response.ok) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      toast.success("Form Submitted Successfully!");
    } else {
      const data = await response.json();
      console.error("Error:", data);
      setResult(data.message || "Form submission failed.");
      toast.error("Form submission failed.");
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Send Us a Message <img src={msg_icon} alt="" />
        </h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam vel
          accusamus quae, nesciunt facilis velit maiores quaerat tenetur dolore
          temporibus nam voluptates exercitationem explicabo iure necessitatibus
          deleniti maxime officiis non.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="" />
            Contact@gmail.com
          </li>
          <li>
            <img src={phone_icon} alt="" />
            +91 1234567890
          </li>
          <li>
            <img src={location_icon} alt="" />
            Patna Bihar
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter Your Number"
            required
          />
          <label>Enter Your Message Here</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Enter Your Message"
            required
          ></textarea>
          <button type="submit" className="btn dark-btn">
            Send Message <img src={white_arrow} alt="" />
          </button>
        </form>
        <span>{result}</span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
