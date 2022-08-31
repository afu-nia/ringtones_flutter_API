'use strict'

class PageController {

  showHome({ view }) {
    return view.render('home');
  }

  showAddUser({ view }) {
    return view.render('signup');
  }

  showLogin({ view }) {
    return view.render('login');
  }

  showResendConfirm({ view }) {
    return view.render('resend_confirm');
  }

  showDashboard({ view }) {
    return view.render('dashboard');
  }
  showMessages({ view }) {
    return view.render('messages');
  }

  showForgotPassword({ view }) {
    return view.render('forgot_password');
  }

  showPasswordReset({ view, params }) {
    return view.render('reset_password', {
      token: params.token,
    });
  }

  showAddApp({ view }) {
    return view.render('add_app');
  }

  showAddRington({ view, params }) {
    return view.render('add_rington', { app_id: params.app_id });
  }

  showAddRingtons({ view, params }) {
    return view.render('add_ringtons', { app_id: params.app_id });
  }


  listUsers({ view }) {
    return view.render('users');
  }


  showRingtonesApp({ view }) {
    return view.render('ringtones_app');
  }

}

module.exports = PageController
