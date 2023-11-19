import React, { useState, useEffect } from 'react';

import ToDo from '../components/todo';
import Notes from '../components/notes';
import Apps from '../components/apps';
import Backgrounds from '../components/backgrounds';

interface AppSetup {
    isActive: boolean,
    setActive: Function
}

const Menu = () => {
    const [activeApp, setActiveApp] = useState<string>("");
    const [todo, setTodo] = useState<boolean>(false);
    const [notes, setNotes] = useState<boolean>(false);
    const [apps, setApps] = useState<boolean>(false);
    const [backgrounds, setBackgrounds] = useState<boolean>(false);

    const available_apps: { [name: string]: AppSetup } = {
        'todo': { isActive: todo, setActive: setTodo },
        'notes': { isActive: notes, setActive: setNotes },
        'apps': { isActive: apps, setActive: setApps },
        'backgrounds': { isActive: backgrounds, setActive: setBackgrounds }
    }

    const ToggleApp = (app: string) => {
        const app_setup = available_apps[app];
        const is_active = activeApp == app;

        if (is_active) {
            app_setup.setActive(false);
            setActiveApp("");
            return;
        }

        if (activeApp !== "") {
            const active_app = available_apps[activeApp];
            active_app.setActive(false);
        }

        app_setup.setActive(true);
        setActiveApp(app);
    }

    return (
        <div>
            <ToDo open={todo} setOpen={() => ToggleApp('todo')} />
            <Notes open={notes} setOpen={() => ToggleApp('notes')} />
            <Apps open={apps} setOpen={() => ToggleApp('apps')} />
            <Backgrounds open={backgrounds} setOpen={() => ToggleApp('backgrounds')} />

            <div className='left-apps apps'>
                <div className='app' onClick={() => ToggleApp('backgrounds')}>
                    <img src='/img/apps/image.svg' />
                </div>
            </div>

            <div className='right-apps apps'>

                <div className='app' onClick={() => ToggleApp('todo')}>
                    <img src='/img/apps/todo.png' />
                </div>

                <div className='app' onClick={() => ToggleApp('notes')}>
                    <img src='/img/apps/notes.png' />
                </div>

                <div className='app' onClick={() => ToggleApp('apps')}>
                    <img src='/img/apps/apps.png' />
                </div>

            </div>
        </div>
    )
}

export default Menu;