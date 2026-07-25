function MainContent({ children }) {
  //! Main JSX
  return (
    <main className="grid h-full min-h-0 grid-cols-1 grid-rows-[5rem_auto_4rem] overflow-hidden">
      {children}
    </main>
  );
}

export default MainContent;
