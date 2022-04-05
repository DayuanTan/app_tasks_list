class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <header>
            <div class="header_text">
                    <a href="./tasklist.html">Home</a>
                    &nbsp &nbsp
                    <a href="./signin.html">Sign In</a>
                    &nbsp &nbsp
                    <a href="./signon.html">Sign On</a>
                    &nbsp &nbsp
                    <a href="https://dayuantan.github.io/AboutMe/">Dayuan Tan's Personal Page</a>
                    &nbsp
            </div>
        </header>
      `;
    }
  }
  
  customElements.define('header-component', Header);
  // <div class="jumbotron text-center header_margin_bottom">
  //               <div class="a_hover_bottom_whiteline">
  //               </div>
  //           </div>
                    