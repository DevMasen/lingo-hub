import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div>
      <header>هدر</header>
      <main>
        صفحه اصلی
        <Outlet />
      </main>
      <footer>فوتر</footer>
    </div>
  );
}

export default AppLayout;
