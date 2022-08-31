const AccessDeniedException = use('App/Exceptions/AccessDeniedException')
const NotFoundException = use('App/Exceptions/NotFoundException')

class AuthorizationService {
    verifyPermission(resources, user) {

        if (!resources) {
            throw new NotFoundException();
        }

        if (resources.user_id !== user.id && user.roll == 0) {
            throw new AccessDeniedException();
        }
    }

    verifyNotificationPermission(resources, currenUser) {
        if (resources.userID !== currenUser.id) {
            throw new AccessDeniedException();
        }
    }

    verifyAdminPermission(user) {
        if (user.roll != 1) {
            throw new AccessDeniedException();
        }
    }

    verifyCurrentUser(id, user) {
        if (id != user.id) {
            throw new AccessDeniedException();
        }
    }
}

module.exports = new AuthorizationService();