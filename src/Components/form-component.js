import React from "react";
import PhoneInput from "react-phone-input-2";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const phoneValidator = /^(\+91[\-\s]?)?[789]\d{9}$/;
const AdhaarValidator = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
const PanValidator = /[A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/;
class FormComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            passwordConfirmation: "",
            firstNameError: "",
            emailAddressError: "",
            passwordError: "",
            passwordConfirmationError: "",
            isFormSubmitted: false,
            phone: "",
            phoneError: " ",
            country: "",
            city: "",
            adhaar: "",
            adhaarError: "",
            Pan: "",
            panError: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(
            this
        );
        this.validateField = this.validateField.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.validateAdhaar = this.validateAdhaar.bind(this);
        this.validatePan = this.validatePan.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

        return;
    }

    handleBlur(event) {
        const { name } = event.target;

        this.validateField(name);
        return;
    }

    handleSubmit(event) {
        event.preventDefault();
        let formFields = [
            "firstName",
            "lastName",
            "emailAddress",
            "password",
            "passwordConfirmation",
            "phone",
            "adhaar",
            "Pan",
        ];
        let isValid = true;
        formFields.forEach(field => {
            isValid = this.validateField(field) && isValid;
        });

        if (isValid) this.setState({ isFormSubmitted: true });
        else this.setState({ isFormSubmitted: false });

        return this.state.isFormSubmitted;
    }

    validateField(name) {
        let isValid = false;

        if (name === "firstName") isValid = this.validateFirstName();
        else if (name === "lastName") isValid = this.validateLastName();
        else if (name === "emailAddress") isValid = this.validateEmailAddress();
        else if (name === "password") isValid = this.validatePassword();
        else if (name === "passwordConfirmation")
            isValid = this.validatePasswordConfirmation();
        else if (name === "phone") isValid = this.validatePhoneNumber();
        else if (name === "adhaar") isValid = this.validateAdhaar();
        else if (name === "Pan") isValid = this.validatePan();
        return isValid;
    }

    validateFirstName() {
        let firstNameError = "";
        const value = this.state.firstName;
        if (value.trim() === "") firstNameError = "First Name is required";

        this.setState({
            firstNameError
        });
        return firstNameError === "";
    }

    validatePhoneNumber() {
        let phoneError = "";
        const number = this.state.phone;
        if (!phoneValidator.test(number)) phoneError = "10 digits are required and Write the country code properly like +91";
        this.setState({
            phoneError
        });
        return phoneError === "";


    }


    validatePan() {
        let panError = "";
        const value = this.state.Pan;
        if (!PanValidator.test(value)) panError = "Enter the valid Pan No"
        this.setState({
            panError
        });
        return panError === "";

    }

    validateAdhaar() {
        let adhaarError = "";
        const value = this.state.adhaar;
        if (!AdhaarValidator.test(value)) adhaarError = "Enter the valid adhaar"

        this.setState({
            adhaarError
        });
        return adhaarError === "";
    }


    validateLastName() {
        let lastNameError = "";
        const value = this.state.lastName;
        if (value.trim() === "") lastNameError = "Last Name is required";

        this.setState({
            lastNameError
        });
        return lastNameError === "";
    }

    validateEmailAddress() {
        let emailAddressError = "";
        const value = this.state.emailAddress;
        if (value.trim === "") emailAddressError = "Email Address is required";
        else if (!emailValidator.test(value))  //test function is to evaluate or check the regular expression 
            emailAddressError = "Email is not valid";

        this.setState({
            emailAddressError
        });
        return emailAddressError === "";
    }

    validatePassword() {
        let passwordError = "";
        const value = this.state.password;
        if (value.trim === "") passwordError = "Password is required";
        else if (!passwordValidator.test(value))
            passwordError =
                "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

        this.setState({
            passwordError
        });
        return passwordError === "";
    }

    validatePasswordConfirmation() {
        let passwordConfirmationError = "";
        if (this.state.password !== this.state.passwordConfirmation)
            passwordConfirmationError = "Password does not match Confirmation";

        this.setState({
            passwordConfirmationError
        });
        return passwordConfirmationError === "";
    }

    render() {
        return (
            <div className="main" style={{backgroundColor:"rgb(0, 230, 172)"}} >
                <h3 style={{fontWeight:"bold"}}>SignUp Form</h3>
                {this.state.isFormSubmitted ? (
                    <div className="details">
                        <h3>Thanks for signing up, find your details below:</h3>
                        <div>First Name: {this.state.firstName}</div>
                        <div>Last Name: {this.state.lastName}</div>
                        <div>Email Address: {this.state.emailAddress}</div>
                        <div>Country: {this.state.country}</div>
                        <div>City: {this.state.city}</div>
                        <div>Adhaar No: {this.state.adhaar}</div>
                        <div>Pan No: {this.state.Pan}</div>
                    </div>
                ) : (
                    <div style={{ textAlign: "center" ,alignItems:"center"}}>
                        <form onSubmit={this.handleSubmit} >
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                            />
                            <br />
                            {this.state.firstNameError && (
                                <div className="errorMsg">{this.state.firstNameError}</div>
                            )}
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                            />
                            <br />
                            {this.state.lastNameError && (
                                <div className="errorMsg">{this.state.lastNameError}</div>
                            )}
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="emailAddress"
                                value={this.state.emailAddress}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                            />
                            <br />
                            {this.state.emailAddressError && (
                                <div className="errorMsg">{this.state.emailAddressError}</div>
                            )}
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                            />
                            <br />
                            {this.state.passwordError && (
                                <div className="errorMsg">{this.state.passwordError}</div>
                            )}
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="passwordConfirmation"
                                value={this.state.passwordConfirmation}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                            />
                            <br />
                            {this.state.passwordConfirmationError && (
                                <div className="errorMsg">
                                    {this.state.passwordConfirmationError}
                                </div>
                            )}
                            <input
                                type="tele"
                                placeholder="Phone Number with country code"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />
                            <br />
                            {this.state.phoneError && (<div className="errorMsg">
                                {this.state.phoneError}
                            </div>)}

                            <label htmlFor="country">Country</label>
                            <br />
                            <select
                                name="country"
                                id="country"
                                value={this.state.country}
                                onChange={this.handleChange} // Corrected attribute name
                                className="dropdown"
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="Russia">Russia</option>
                                <option value="France">France</option>
                            </select>

                            <br />
                            <br />

                            <label htmlFor="city">City</label> {/* Corrected id */}
                            <br />
                            <select
                                name="city"
                                id="city"
                                value={this.state.city}
                                onChange={this.handleChange} // Corrected attribute name
                                className="dropdown"
                            >
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Karnataka">Karnataka</option>
                            </select>


                            <br />
                            <input
                                type="text"
                                placeholder="Enter Your Adhaar No"
                                name="adhaar"
                                value={this.state.adhaar}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />
                            {
                                this.state.adhaarError && (<div className="errorMsg">{this.state.adhaarError}</div>)
                            }
                            <br />
                            <input
                                type="text"
                                placeholder="Enter Your Pan No"
                                name="Pan"
                                value={this.state.Pan}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />
                            {
                                this.state.panError && (<div className="errorMsg">{this.state.panError}</div>)
                            }


                            <button>Signup</button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
export default FormComponent;
