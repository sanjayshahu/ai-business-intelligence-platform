import { useState, useEffect } from "react";


interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  isError: boolean;
  errorMsg: string;
}

type FormKeys = "fn" | "ln" | "email" | "pw" | "cpw";
type FormData = Record<FormKeys, FormField>;

const FormValidationComponent:React.FC= ()=> {
  const defaultValues: FormData = {
    fn: {
      id: "fn",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      value: "",
      isError: false,
      errorMsg: "First name cannot be empty",
    },
    ln: {
      id: "ln",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      value: "",
      isError: false,
      errorMsg: "Last name cannot be empty",
    },
    email: {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      value: "",
      isError: false,
      errorMsg: "Email cannot be empty",
    },
    pw: {
      id: "pw",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      value: "",
      isError: false,
      errorMsg: "Password cannot be empty",
    },
    cpw: {
      id: "cpw",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
      value: "",
      isError: false,
      errorMsg: "Confirm password cannot be empty",
    },
  };

  const [formData, setFormData] = useState<FormData>(defaultValues);
  const [pwMismatch, setPwMismatch] = useState<boolean>(false);

  // 🧩 Handle input changes
  const handleChange = (id: FormKeys, value: string): void => {
    setPwMismatch(false);
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], value, isError: false },
    }));
  };

  // 🧠 Validate form before submission
  const validateForm = (): boolean => {
    let isValid = true;

    const updatedForm = Object.keys(formData).reduce((acc, key) => {
      const k = key as FormKeys;
      const field = formData[k];
      const hasError = !field.value.trim();
      acc[k] = { ...field, isError: hasError };
      if (hasError) isValid = false;
      return acc;
    }, {} as FormData);

    const pw = updatedForm.pw.value.trim();
    const cpw = updatedForm.cpw.value.trim();

    if (pw !== cpw) {
      isValid = false;
      setPwMismatch(true);
      updatedForm.cpw = {
        ...updatedForm.cpw,
        isError: true
       
      };
    }

    setFormData(updatedForm);
    return isValid;
  };

  // 🪶 Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      alert("✅ Form submitted successfully!");
      console.log("Submitted data:", formData);
      // Reset form after successful submit
      setFormData(defaultValues);
    } else {
      console.warn("⚠️ Validation failed.");
    }
  };

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  return (
    <div className="App">
      <h1>Form Validation</h1>
      <div className="container">
        <form onSubmit={handleSubmit} noValidate>
          {Object.entries(formData).map(([key, field]) => {
            const { id, label, type, placeholder, value, isError, errorMsg } = field;
            return (
              <div key={id} className="form-item">
                <label htmlFor={id}>{label}</label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => handleChange(key as FormKeys, e.target.value)}
                />
                {isError && <span className="error">{errorMsg}</span>}
              </div>
            );
          })}

          {pwMismatch && (
            <span className="error">Passwords do not match</span>
          )}

          <div className="form-item">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormValidationComponent;
