import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

// Define the Form values interface
interface FormValues {
  passwordLength: string;
}

// Yup validation schema
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Minimum length is 4")
    .max(16, "Maximum length is 16")
    .required("Password length is required"),
});

const App: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [isPassGenerated, setIsPassGenerated] = useState<boolean>(false);

  const [lowerCase, setLowerCase] = useState<boolean>(true);
  const [upperCase, setUpperCase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = "";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_+";

    if (upperCase) characterList += upperCaseChars;
    if (lowerCase) characterList += lowerCaseChars;
    if (numbers) characterList += digitChars;
    if (symbols) characterList += specialChars;

    if (characterList.length === 0) {
      setPassword("Please select at least one option.");
      setIsPassGenerated(true);
      return;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number): string => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword("");
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={PasswordSchema}
            onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
              generatePasswordString(Number(values.passwordLength));
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange("passwordLength")}
                    placeholder="e.g., 8"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {isPassGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;
export const styles = StyleSheet.create({
	appContainer: {
	  flex: 1,
	  backgroundColor: "#f7f7f7",
	},
	formContainer: {
	  margin: 16,
	  padding: 16,
	},
	title: {
	  fontSize: 30,
	  fontWeight: "700",
	  marginBottom: 20,
	  color: "#333",
	},
	subTitle: {
	  fontSize: 24,
	  fontWeight: "600",
	  marginBottom: 8,
	},
	description: {
	  color: "#666",
	  marginBottom: 8,
	  textAlign: "center",
	},
	heading: {
	  fontSize: 16,
	  fontWeight: "500",
	  color: "#222",
	},
	inputWrapper: {
	  marginBottom: 15,
	  alignItems: "center",
	  justifyContent: "space-between",
	  flexDirection: "row",
	},
	inputColumn: {
	  flexDirection: "column",
	  flex: 1,
	},
	inputStyle: {
	  padding: 8,
	  width: 80,
	  borderWidth: 1,
	  borderRadius: 6,
	  borderColor: "#16213e",
	  marginLeft: 10,
	},
	errorText: {
	  fontSize: 12,
	  color: "#ff0d10",
	  marginTop: 4,
	},
	formActions: {
	  flexDirection: "row",
	  justifyContent: "center",
	  marginTop: 16,
	},
	primaryBtn: {
	  width: 140,
	  padding: 12,
	  borderRadius: 8,
	  marginHorizontal: 10,
	  backgroundColor: "#5DA3FA",
	},
	primaryBtnTxt: {
	  color: "#fff",
	  textAlign: "center",
	  fontWeight: "700",
	},
	secondaryBtn: {
	  width: 140,
	  padding: 12,
	  borderRadius: 8,
	  marginHorizontal: 10,
	  backgroundColor: "#CAD5E2",
	},
	secondaryBtnTxt: {
	  textAlign: "center",
	  fontWeight: "600",
	},
	card: {
	  padding: 16,
	  borderRadius: 8,
	  margin: 16,
	},
	cardElevated: {
	  backgroundColor: "#fff",
	  elevation: 3,
	  shadowColor: "#000",
	  shadowOffset: { width: 1, height: 2 },
	  shadowOpacity: 0.25,
	  shadowRadius: 3.84,
	},
	generatedPassword: {
	  fontSize: 22,
	  textAlign: "center",
	  fontWeight: "500",
	  color: "#000",
	},
  });