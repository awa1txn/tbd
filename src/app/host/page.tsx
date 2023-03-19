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

const gameTypeOptions = [
    {
        label: 'Бліц',
        id: 0
    }, {
        label: 'Стандарт',
        id: 1
    }, {
        label: 'Класік',
        id: 2
    }];
const mapTypeOptions = ['африка', 'іспанія', 'франція', 'казакхстан', 'італія', 'україна(не працює)'];
const urlPaths = [
    'africa',
    'spain',
    'france',
    'kazakhstan',
    'italy',
    'ukraine'
]
export default function Page() {
    const [value, setValue] = React.useState<string>('');
    const [url, setUrl] = React.useState('1')

    return (<>
        <div className={style.hostGamePanel}>
            <div className={style.hostMainMenu}>
                <ThemeProvider theme={theme}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                        <div>
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Назва гри</InputLabel>
                                <Input />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={gameTypeOptions}
                                    getOptionLabel={(option) => option.label}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Тип гри" />}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">

                                <Autocomplete
                                    value={value}
                                    onChange={(event: any, newValue: any) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={url}
                                    onInputChange={(event, newInputValue) => {
                                        setUrl(newInputValue);
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={mapTypeOptions}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Мапа подій" />}
                                />
                            </FormControl>
                        </div>
                    </Box>
                </ThemeProvider>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Link href={`http://localhost:3000/rooms/${urlPaths[mapTypeOptions.indexOf(value)]}`}>
                        <Button variant="outlined"> Розпочати масову еблю</Button>
                    </Link>
                </Box>

            </div>
        </div>
    </>
    );
}