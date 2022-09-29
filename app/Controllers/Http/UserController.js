'use strict'
// const Database = use('Database');

const User = use('App/Models/User');
const App = use('App/Models/App');


const Mail = use('Mail');
const randomString = require('random-string');

const { validate } = use('Validator');
const { flashAndRedirect } = use('App/helpers');


const Helpers = use('Helpers')
const Drive = use('Drive');
const readline = require("readline");

class UserController {

    async index({ view, auth, request }) {


        const user_id = auth.user.id;
        const apps = await App.query().where('user_id', user_id).paginate(request.input('page'), 10);

        return view.render('dashboard', { apps: apps })
    }


    // Add new App
    async addApp({ auth, request, response, session }) {
        const user_id = await auth.user.id;
        const user = await auth.getUser();
        const { name } = request.all();
        const app = await App.create({
            user_id,
            name
        });

        await user.apps().save(app);
        return flashAndRedirect(
            'success',
            'Aplicación agregada correctamente',
            '/dashboard',
            {
                session,
                response,
            }
        );
    }

    // Registrar nuevo usuario
    async store({ request, response, session }) {

        const { email, name } = request.all();


        const validation = await validate(request.all(), {
            email: 'required|email',
            name: 'required',
        });

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password']);
            return response.redirect('back');
        }

        const userFound = await User.findBy('email', request.input('email'));
        if (userFound) {
            return flashAndRedirect(
                'danger',
                'Ya existe cuenta con este email',
                'back',
                {
                    session,
                    response,
                }
            );
        }

        const password = randomString({ lenght: 10 });

        const roll = 0;

        const user = await User.create({
            email,
            password,
            name,
            roll,
        });

        const userEmail = email;
        const pass = password;

        const userTemp = { userEmail, pass };

        await Mail.send('email.register_email', userTemp, message => {
            message
                .to(user.email)
                .from('niaa1pps@gmail.comm')
                .subject('Detalles de acceso Ringtones Api')

        });

        return flashAndRedirect(
            'success',
            'Cuenta registrada correctamente!',
            '/list-users',
            {
                session,
                response,
            }
        );

    }


    // // Subir y actualizar foto de perfil
    // async userProfilePicUpate({ auth, request, response }) {
    //     const user = await auth.authenticator('jwt').getUser();
    //     const { id } = request.all();
    //     AuthorizationService.verifyCurrentUser(id, user);
    //     const postImage = request.file('images', {
    //         types: ['octet-stream', 'image'],
    //         size: '10mb'
    //     });


    //     // move images
    //     const date = new Date().getTime();
    //     await postImage.move(Helpers.publicPath('uploads'), {
    //         name: date + '_' + postImage.clientName

    //     });
    //     var profile_pic = date + '_' + postImage.clientName;
    //     user.profile_pic = profile_pic;
    //     await user.save();
    //     return response.status(200).json({
    //         message: 'ok'
    //     })

    // }

    // show Images
    async showImage({ params, response }) {

        const { fileName } = params;
        const filePath = 'uploads/' + fileName;

        const exists = await Drive.exists(filePath);

        if (exists) {
            return response.download(Helpers.publicPath(filePath));
        } else {
            return response.download(Helpers.publicPath(filePath));
        }

    }



    async appDelete({ params, session, response }) {


        const app = await App.find(params.id);
        await app.delete();
        return flashAndRedirect(
            'success',
            'App eliminada correctamente',
            '/dashboard',
            {
                session,
                response,
            }
        );
    }

    async listUsers({ view, request }) {
        // const users = await User.all();
        const users = await User.query().paginate(request.input('page'), 10);
        return view.render('users', { users: users })
    }

    async deleteUser({ params, session, response }) {


        const user = await User.find(params.id)
        await user.delete()

        return flashAndRedirect(
            'success',
            'Usuario eliminado correctamente!',
            '/list-users',
            {
                session,
                response,
            }
        );
    }
}

module.exports = UserController
