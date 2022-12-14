'use strict'


const Rington = use('App/Models/Rington');
const Database = use('Database');
const { flashAndRedirect } = use('App/helpers');
const Helpers = use('Helpers')
const Drive = use('Drive');

class RingtonController {

    async loadRingtonsApp({ request, response }) {
        const { app_id } = request.all();
        const ringtones = await Database.table('ringtons')
            .where('app_id', app_id)
            .orderBy('id', 'desc');
        return response.status(200).json({
            ringtones
        });
    }

    async ringtonesApp({ view, params, request }) {

        const app_id = params.id;
        const ringtones = await Rington.query().where('app_id', app_id).paginate(request.input('page'), 10);
        return view.render('ringtones_app', { ringtones: ringtones, app_id: app_id });

    }

    async destroy({ params, session, response }) {
        const task = await Rington.find(params.id)

        await task.delete()
        flashAndRedirect(
            'success',
            'Rington eliminado correctamente!',
            '/app/' + params.app_id,
            {
                session,
                response,
            }
        );
    }


    async addRington({ request, response, params }) {
        const { image } = request.all();
        const app_id = params.app_id;
        const tono = request.file('tono', {
            types: ['audio'],
            size: '10mb'
        });

        const path = 'upload/' + app_id;
        const name = tono.clientName;

        var old_path_rington = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        var path_rington = old_path_rington.replace('_' + tono.extname, '.' + tono.extname);
        await tono.move(Helpers.publicPath(path), {
            name: path_rington,
            overwrite: true
        })

        const rington = await Rington.create({
            app_id,
            name,
            image,
            path_rington
        });
        await rington.save(rington);
        const redi = '/app/' + app_id;

        return response.redirect(redi);

    }


    async addRigtons({ request, response, params }) {
        const { image } = request.all();
        const app_id = params.app_id;
        const tonos = request.file('tono', {
            types: ['audio'],
            size: '10mb'
        });

        const path = 'upload/' + app_id;

        var allRinngtones = [];
        var alltTypes = [];
        tonos.moveAll(Helpers.publicPath(path), (file) => {
            allRinngtones.push(file.clientName);
            alltTypes.push(file.extname);
            var old_path_rington = file.clientName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            var name_rington = old_path_rington.replace('_' + file.extname, '.' + file.extname);
            return {
                name: name_rington,
                overwrite: true
            }
        })

        for (let index = 0; index < allRinngtones.length; index++) {
            const name = allRinngtones[index];
            var old_path_rington = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            var path_rington = old_path_rington.replace('_' + alltTypes[index], '.' + alltTypes[index]);
            const rington = await Rington.create({
                app_id,
                name,
                image,
                path_rington
            });
            await rington.save(rington);

        }

        const redi = '/app/' + app_id;
        return response.redirect(redi);
    }


    async showRington({ params, response }) {
        const file_name = params.file_name;
        const app_id = params.app_id;
        const filePath = 'upload/' + app_id + '/' + file_name;
        const exists = await Drive.exists(filePath);
        if (exists) {
            return response.download(Helpers.publicPath(filePath));
        } else {
            return response.download(Helpers.publicPath(filePath));
        }
    }

    async seach({ request, response, params }) {
        const word = params.word;
        const app_id = params.app_id;

        const ringtones = await Database.select('*').from('ringtons')
            .where('app_id', app_id)
            .where('name', 'LIKE', '%' + word + '%');
        return response.status(200).json({
            ringtones
        });
    }

}

module.exports = RingtonController
