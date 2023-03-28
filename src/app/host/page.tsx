"use client";
import style from '../page.module.css'
import { AppBar, Autocomplete, Avatar, Badge, Box, Button, createTheme, FormControl, IconButton, Input, InputLabel, Link, Slider, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import * as React from 'react';

const theme = createTheme({
    palette: {
        background: {
            paper: 'black',
        },
        text: {
            primary: 'white',
            secondary: 'dark',
        },
        action: {
            active: '#001E3C',
        },

    },
});

export default function Page() {
    const [value, setValue] = React.useState<string>('');
    const [url, setUrl] = React.useState('1')

    const [file, setFile] = React.useState<File | null>(null); //for geojson uploader
    const [battleType, setBattleType] = React.useState('');
    const [battleName, setBattleName] = React.useState('');


    const onFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;

        if (!fileInput.files) {
            alert("Ти точно загрузив файл? Спробуй ще");
            return;
        }

        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Файлів досі нема");
            return;
        }

        const file = fileInput.files[0];

        /** File validation */
        if (!file.type.startsWith("application/geo+json")) {
            alert("Те що ти загрузив - не є geojson");
            return;
        }

        /** Setting file state */
        setFile(file); // we will use the file state, to send it later to the server
        console.log(file)
        //setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

        /** Reset file input */
        e.currentTarget.type = "text";
        e.currentTarget.type = "file";
    };

    const onCancelFile = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("From onCancelFile");
    };

    const onUploadFile = async () => {

        if (!file) {
            alert('Перевір чи точно ти загрузив файл, якщо так, то спробуй ще раз. Якщо не допомогае - Ctrl+F5')
            return;
        }

        try {
            const body = new FormData()
            body.append("file", file, `${battleName}.geojson`);

            const res = await fetch("/api/games/host/upload", {
                method: "POST",
                body,
            })
            // console.log(formData.get("file"))
            console.log("File was uploaded successfylly:", file);
        } catch (error) {
            console.error(error);
            alert("Sorry! something went wrong.");
        }
    };

    return (<>
        <div className={style.hostGamePanel}>
            <div className={style.hostMainMenu}>
                <div style={{ margin: '10px 0px' }}>
                    <h3>Застереження для модераторів/адмінів:</h3>
                    <ul>
                        <li>Для загрузки потрібен файл geojson, якщо в тебе нема його. То краще нічого не чіпай.</li>
                        <li>Назву гри обирати латиницею, або англійськими символами(для посилання).</li>
                        <li>Якщо будуть питання, пиши тим хто є шарій або просто шарить.</li>
                    </ul>
                </div>
                <ThemeProvider theme={theme}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                        <div>
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Назва гри</InputLabel>
                                <Input onChange={(e) => { setBattleName(e.target.value) }} />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                                <input type="search" list="languages" placeholder="Оберіть тип гри" onChange={(e) => { e.target.value === 'Bliz' || 'Glassic' ? setBattleType(e.target.value) : setBattleType('') }} />
                                <datalist id="languages">
                                    <option value="Bliz" />
                                    <option value="Glassic" />
                                </datalist>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                                <input id='mapLoader' type="file" onChange={onFileUploadChange} />
                                <label htmlFor="mapLoader">*клік* аби додати файл</label>
                                <p>{file?.name != null ? file.name + `: файл було додано успішно` : null}</p>
                            </FormControl>
                        </div>
                    </Box>
                </ThemeProvider>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Link href={`http://localhost:3000/rooms/host/${battleName}`}>
                        {/* battleType === 'Bliz' && 'Glassic' ? false : true &&  */}
                        <Button disabled={!file?.name} variant="outlined"><p onClick={onUploadFile}>Відкрити масову еблю</p></Button>
                    </Link>
                </Box>

            </div>
        </div>
    </>
    );
}