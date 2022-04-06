from django import forms

class SignInForm(forms.Form):
    usernickname = forms.CharField(label='Username', max_length=100)
    userpwd = forms.CharField(label='Password', max_length=100)
    
class SignOnForm(forms.Form):
    userfirstname = forms.CharField(label='firstname', max_length=100)
    usermiddlename = forms.CharField(label='middlename', max_length=100)
    userlastname = forms.CharField(label='lastname', max_length=100)
    usernickname = forms.CharField(label='username', max_length=100)
    useremail = forms.CharField(label='email', max_length=100)
    userdob = forms.DateField(label='dob')
    usergender = forms.CharField(label='gender', max_length=20)
    userpwd = forms.CharField(label='password', max_length=100)