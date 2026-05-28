// No imports needed since JSX transformation is implicit

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-koin">Koin</span>
          <span className="logo-x">X</span>
          <span className="logo-reg">®</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
