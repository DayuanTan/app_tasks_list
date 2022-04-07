from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
import hashlib

from .models import Users, Userchangerecords, Userloginactivityrecords, Tasks
from .forms import SignInForm, SignOnForm

# Create your views here.


def index(request):
    return render(request, 'apptasklistmng/tasklist.html')
def indexLongerUrl(request):
    return redirect('apptasklistmng:index')

def signon(request):
    return render(request, 'apptasklistmng/signon.html')
def signonLongerUrl(request):
    return redirect('apptasklistmng:signon')


def signin(request):
    return render(request, 'apptasklistmng/signin.html')
def signinLongerUrl(request):
    return redirect('apptasklistmng:signin')


def signinprocess(request): #, usernickname, userpwd):
    # return HttpResponseRedirect(reverse('apptasklistmng:userprofile', args=(usernickname,userpwd,)))
    
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = SignInForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            form.cleaned_data
            print("signin form: ", form)
            usernickname = form['usernickname'].value()
            userpwd = form['userpwd'].value()
            print("signin form usernickname value: ", usernickname)
            print("signin form userpwd value: ", userpwd)
            userpwd = str(hashlib.md5( userpwd.encode() ).hexdigest())
            print("userpwd hash: ", userpwd)
            
            # connect DB
            try:
                user = Users.objects.get(usernickname=usernickname, userpwd=userpwd)
            except Users.DoesNotExist:
                return render(request, 'apptasklistmng/signin.html', {"errormsg": "Username or Password Incorrect. Please try again."})            
            return render(request, 'apptasklistmng/userprofile.html', {"usernickname": usernickname, "userpwd": userpwd})
            
            # Another way but abandon
            # if get_object_or_404(Users, usernickname=usernickname, userpwd=userpwd):
            #     # redirect to a new URL:
            #     # return HttpResponseRedirect("userprofile/")
            #     return render(request, 'apptasklistmng/userprofile.html', {"usernickname": usernickname, "userpwd": userpwd})
            # else:
            #     return HttpResponse("hello signin process username or pwd incorrect ")

    # if a GET (or any other method) we'll create a blank form
    else:
        form = SignInForm()
        return render(request, 'apptasklistmng/wrong.html', {"errormsg": "Hello signon process don't use get."}) 
    
def signonprocess(request):
    if request.method == 'POST':
        form = SignOnForm(request.POST)
        if form.is_valid():
            form.cleaned_data 
            userfirstname = form["userfirstname"].value()
            usermiddlename = form["usermiddlename"].value()
            userlastname = form["userlastname"].value()
            useremail = form["useremail"].value()
            userdob = form["userdob"].value()
            usergender = form["usergender"].value()
            usernickname = form["usernickname"].value()
            userpwd = form["userpwd"].value()
            print("signon form usernickname: ", usernickname)
            print("signon form userlastname: ", userlastname)
            print("signon form userfirstname: ", userfirstname)
            print("signon form usermiddlename: ", usermiddlename)
            print("signon form useremail: ", useremail)
            print("signon form usedob: ", userdob)
            print("signon form usergender: ", usergender)
            print("signon form userpwd: ", userpwd)
            userpwd = str(hashlib.md5( userpwd.encode() ).hexdigest())
            print("signon form userpwd hash: ", userpwd)
            
            # connect DB
            try:
                Users.objects.create(userfirstname=userfirstname, usermiddlename=usermiddlename, userlastname=userlastname, 
                usernickname=usernickname, useremail=useremail, 
                usergender=usergender, userpwd=userpwd, userdob=userdob)
            except:
                return render(request, "apptasklistmng/wrong.html", {"errormsg": "User Sign On Failed. Please try again."})           
            return render(request, "apptasklistmng/userprofile.html", {"usernickname": usernickname, "userpwd": userpwd, "userlastname: ": userlastname, "userfirstname: ": userfirstname,"usermiddlename: ": usermiddlename, "useremail: ": useremail,"usedob: ": userdob, "usergender: ":usergender })
        
        return render(request, 'apptasklistmng/wrong.html', {"errormsg": "Hello signon process invalid."}) 
    else:
        return render(request, 'apptasklistmng/wrong.html', {"errormsg": "Hello signon process don't use get."}) 
    
# def userprofile(request):
#     return HttpResponse("userprofile page")