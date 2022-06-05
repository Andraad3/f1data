import { Button, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import './style.css';
import austria2018 from './images/austria2018.png';
import austria2019 from './images/austria2019.png';
import austria2021 from './images/austria2021.png';
import bahrein2018 from './images/bahrein2018.png';
import bahrein2019 from './images/bahrein2019.png';
import bahrein2021 from './images/bahrein2021.png';
import interlagos2018 from './images/interlagos2018.png';
import interlagos2019 from './images/interlagos2019.png';
import interlagos2021 from './images/interlagos2021.png';



function App() {
  const corridas = [
    { ano: 2021 },
    { ano: 2019 },
    { ano: 2018 },
  ]
  const corridasGP = [
    {
      ano: 2021,
      gp: 'GP Bahrein',
      corrida: 1
    },
    {
      ano: 2021,
      gp: 'GP Austria',
      corrida: 9
    },
    {
      ano: 2021,
      gp: 'GP Interlagos',
      corrida: 19
    },
    {
      ano: 2019,
      gp: 'GP Bahrein',
      corrida: 2
    },
    {
      ano: 2019,
      gp: 'GP Austria',
      corrida: 9
    },
    {
      ano: 2019,
      gp: 'GP Interlagos',
      corrida: 20
    },
    {
      ano: 2018,
      gp: 'GP Bahrein',
      corrida: 2
    },
    {
      ano: 2018,
      gp: 'GP Austria',
      corrida: 9
    },
    {
      ano: 2018,
      gp: 'GP Interlagos',
      corrida: 20
    },
  ]

  const [gp, setGp] = useState()
  const [ano, setAno] = useState()
  const [resultado, setResultado] = useState()
  const [qualy, setQualy] = useState()
  const [pitstops, setPitStops] = useState()

  function getPitStopsGP() {
    axios.get(`https://ergast.com/api/f1/${ano}/${gp}/pitstops.json`).then(response => {
      console.log('Resposta: ', response.data);
      setPitStops(response.data.MRData.RaceTable.Races[0].PitStops)
      setResultado()
      setQualy()
      setView('PitStops')
    })
  }

  function getResultGP() {
    axios.get(`https://ergast.com/api/f1/${ano}/${gp}/results.json`).then(response => {
      console.log('Resposta: ', response.data);
      setResultado(response.data.MRData.RaceTable.Races[0].Results)
      setPitStops()
      setQualy()
      setView('Resultado')
    })
  }

  function getQualyGP() {
    axios.get(`https://ergast.com/api/f1/${ano}/${gp}/qualifying.json`).then(response => {
      console.log('Resposta: ', response.data);
      setQualy(response.data.MRData.RaceTable.Races[0].QualifyingResults)
      setPitStops()
      setResultado()
      setView('Qualify')
    })
  }

  const [img, setImg] = useState()

  function getStrategy() {
    switch (ano) {
      case 2021:
        if (gp === 1) {
          setImg(bahrein2021)
        } else if (gp === 9) {
          setImg(austria2021)
        } else {
          setImg(interlagos2021)
        }
        break;
      case 2019:
        if (gp === 2) {
          setImg(bahrein2019)
        } else if (gp === 9) {
          setImg(austria2019)
        } else {
          setImg(interlagos2019)
        }
        break;
      case 2018:
        if (gp === 2) {
          setImg(bahrein2018)
        } else if (gp === 9) {
          setImg(austria2018)
        } else {
          setImg(interlagos2018)
        }
        break;
      default:
        break;

    }
    setView('Strategy')
  }

  function changeGP(e) {
    setGp(e.target.value)
  }

  function changeAno(e) {
    setAno(e.target.value)
  }

  const [view, setView] = useState('')

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Formula 1</h1>
      </div>
      <form className='raceContainer'>
        <div className='w100'>
          <TextField onChange={changeAno} label='Ano' fullWidth size='small' variant='outlined' select>
            {corridas.map(corrida => (
              <MenuItem value={corrida.ano}>{corrida.ano}</MenuItem>
            ))}
          </TextField>
        </div>

        <div className='w100'>
          <TextField onChange={changeGP} label='Grand Prix' fullWidth size='small' variant='outlined' select>
            {corridasGP?.map(corrida =>
              ano === corrida.ano &&
              (<MenuItem value={corrida.corrida}>{corrida.gp}</MenuItem>)
            )}
          </TextField>
        </div>
      </form>
      <div className='raceContainer'>
        <div className='w100'>
          <Button fullWidth style={{ height: 40 }} variant='contained' className={'raceCard'} onClick={() => getQualyGP()} type='button'>Qualy</Button>
        </div>
        <div className='w100'>
          <Button fullWidth style={{ height: 40 }} variant='contained' className={'raceCard'} onClick={() => getPitStopsGP()} type='button'>PitStops</Button>
        </div>
        <div className='w100'>
          <Button fullWidth style={{ height: 40 }} variant='contained' className={'raceCard'} onClick={() => getResultGP()} type='button'>Final</Button>
        </div>
        <div className='w100'>
          <Button fullWidth style={{ height: 40 }} variant='contained' className={'raceCard'} onClick={() => getStrategy()} type='button'>Estratégia de Pneus</Button>
        </div>
      </div>

      {view === 'Resultado' ? (
        <div className='formResult'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Posição</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Piloto</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Equipe</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Volta Mais Rápida</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                resultado?.map(piloto => {
                  return (
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }} >{piloto?.position}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} >{piloto?.Driver.code}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} >{piloto?.Constructor.name}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} >{piloto?.FastestLap?.lap}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      ) : view === 'PitStops' ? (
        <div className='formResult'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Piloto</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Volta</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Nº Parada</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Hora</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Duração</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                pitstops?.map(piloto => (
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.driverId}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.lap}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.stop}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.time}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.duration}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      ) : view === 'Qualify' ? (
        <div className='formResult'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Piloto</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Posição</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Q1</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Q2</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Q3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                qualy?.map(piloto => (
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.Driver.driverId}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.position}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.Q1}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.Q2}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} >{piloto?.Q3}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      ) : view === 'Strategy' && (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, overflow: 'auto' }}>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#FF3333' }} />
              <p>SOFT</p>
            </div>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#FFF200' }} />
              <p>MEDIUM</p>
            </div>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#EBEBEB' }} />
              <p>HARD</p>
            </div>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#39B54A' }} />
              <p>INTERMEDIATE</p>
            </div>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#00AEEF' }} />
              <p>WET</p>
            </div>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#000000' }} />
              <p>UNKNOWN</p>
            </div>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#FFCBDB' }} />
              <p>ULTRASOFT</p>
            </div>
            <div className='pneus'>
              <div style={{ height: 30, width: 30, backgroundColor: '#f308d8' }} />
              <p>SUPERSOFT</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <img className='imagem' src={img} alt='Estratégia de pneus' />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
