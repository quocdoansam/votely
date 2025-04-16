import { ThemeProvider } from "./components/theme-provider";
import Page from "./app/dashboard/page";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./app/login/page";

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes>
        <Route path='/' element={<Page />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
