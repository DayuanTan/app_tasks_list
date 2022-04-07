
//  didn't use this later. Use django forms instead.

let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', (e) => {
    let formData = new FormData(myForm);
    console.log("Example 1: ");
    console.log(formData.get("username"));
    console.log(formData.get("useracc"));
    console.log(formData.get("userfile"));

    e.preventDefault();
})

document.getElementById('signonform').addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    // Now you can use formData.get('foo'), for example.
    // Don't forget e.preventDefault() if you want to stop normal form .submission
    console.log("Example 2: ");
    console.log(formData.get('firstname'));
    console.log(formData.get('lastname'));
    console.log(formData.get('pwd'));

    e.preventDefault();
});
