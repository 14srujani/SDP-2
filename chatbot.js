// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "YOUR_API_KEY";
  
  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const parts = [
      {text: "input: What does this website do?"},
      {text: "output: We help you reduce food waste and donate excess food to those in need. We offer two main features :\nFood Analysis and amount Generation: Based on the previous trends and patterns in a hotel or restaurant the model suggests the quantity of food need to be prepared in order to avoid wastage based on different aspects\nFood Donation Platform: Connect with local organizations to donate your excess food, ensuring it reaches those who need it most."},
      {text: "input: How can I donate excess food?"},
      {text: "output: Fill out the donation form: Specify the type and quantity of food you have to donate.\nChoose a recipient: Select a local food bank, shelter, or individual in need from our partner network.\nSchedule a pickup : Partner with our delivery service for a convenient pickup at your location (fee applies)."},
      {text: "input: Is there a fee for donating food?"},
      {text: "output: Donating food itself is free. If you choose our pickup service, a convenience fee applies based on the distance between your location and the recipient."},
      {text: "input: Can I claim tax deductions for my donation?"},
      {text: "output: Absolutely! We provide resources and links to help you understand and claim tax deductions for charitable food donations in your area."},
      {text: "input: Do you collect my personal information?"},
      {text: "output: We only collect essential information for donation processing and website functionality. We respect your privacy and adhere to strict data security practices."},
      {text: "input: Why use your website instead of existing donation platforms?"},
      {text: "output: Our website offers unique benefits:\nCombined approach: Reduce waste and donate in one seamless platform.\nConvenience pickup: Schedule hassle-free pickups for larger donations."},
      {text: "input: How much is charged for the service"},
      {text: "output: It depends on the pick up location and on the delivery location"},
      {text: "input: "},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    console.log(response.text());
  }
  
  run();