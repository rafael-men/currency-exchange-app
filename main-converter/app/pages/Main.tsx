"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import { Chart as chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Main = () => {

    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('EUR')
    const [currencies, setCurrencies] = useState<string[]>([])
    const [chartData, setChartData] = useState<any>(null)
    const [convertedValue, setConvertedValue] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const apiKey = "8741332379a169c979bfab5e8690e54f" 

    useEffect(() => {
        axios.get('https://api.currencylayer.com/list?access_key=' + apiKey)
            .then((response) => {
                if (response.data && response.data.currencies) {
                    setCurrencies(Object.keys(response.data.currencies))
                } else {
                    console.error("Não foi possível encontrar as moedas na resposta da API.")
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar as moedas: ", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            axios.get(`https://api.currencylayer.com/live?access_key=${apiKey}&currencies=${toCurrency}&source=${fromCurrency}&format=1`)
                .then((response) => {
                    console.log("Resposta da API:", response.data)

                    if (response.data && response.data.quotes) {

                        const data = response.data.quotes
                        const rateKey = `${fromCurrency}${toCurrency}`
                        
                        if (data[rateKey]) {
                            const rate = data[rateKey]

                            const converted = rate * amount
                            setConvertedValue(converted)

                            setChartData({
                                labels: ["1", "2", "3", "4", "5"], 
                                datasets: [
                                    {
                                        label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
                                        data: [rate, rate + 0.1, rate + 0.2, rate + 0.3, rate + 0.4], 
                                        borderColor: "#3b82f6",
                                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                                    }
                                ]
                            })
                        } else {
                            console.error(`Não foi possível encontrar a taxa de câmbio para ${fromCurrency}${toCurrency}`);
                        }
                    } else {
                        console.error("Resposta inválida ou sem taxas de câmbio.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao carregar dados: ", error)
                })
        }
    }, [fromCurrency, toCurrency, amount])



    const getCountryFlagUrl = (currencyCode:string) => {
        const countryCode = currencyCode.slice(0,2)
        return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-sm rounded-3xl md:max-w-2xl lg:max-w-4xl">
            <div className='flex items-center justify-center mb-4'>
            <h1 className='text-2xl font-bold mr-2'>Conversão de Moedas</h1>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                    <label htmlFor="amount" className='block text-sm font-medium'>
                        Valor a ser Convertido
                    </label>
                    <input 
                        id='amount' 
                        type='number' 
                        value={amount} 
                        onChange={(e) => setAmount(Number(e.target.value))} 
                        className='w-full p-2 border rounded-lg' 
                    />
                </div>

                <div className='flex items-center gap-2'>
                    <img 
                        src={getCountryFlagUrl(fromCurrency)} 
                        alt={`Bandeira de ${fromCurrency}`} 
                        className="w-8 h-8 rounded-full shadow-md"
                    />
                    <label htmlFor='fromCurrency' className='block text-sm font-medium'>
                        Moeda Atual
                    </label>
                    <select 
                        id='fromCurrency' 
                        value={fromCurrency} 
                        onChange={(e) => setFromCurrency(e.target.value)} 
                        className='w-full p-2 rounded-md border'
                    >
                        {loading ? (
                            <option>Carregando...</option>
                        ) : (
                            currencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))
                        )}
                    </select>
                </div>

                <div className='flex items-center gap-2'>
                    <img 
                        src={getCountryFlagUrl(toCurrency)} 
                        alt={`Bandeira de ${toCurrency}`} 
                        className="w-8 h-8 rounded-full shadow-md"
                    />
                    <label htmlFor='toCurrency' className=' text-sm font-medium'>
                        Moeda Final
                    </label>
                    <select 
                        id='toCurrency' 
                        value={toCurrency} 
                        onChange={(e) => setToCurrency(e.target.value)} 
                        className='w-full p-2 rounded-md border'
                    >
                        {loading ? (
                            <option>Carregando...</option>
                        ) : (
                            currencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))
                        )}
                    </select>
                </div>
            </div>
            {convertedValue !== null && (
                <div className='mt-6 text-center'>
                    <h2 className='text-xl font-semibold'>Valor final convertido: </h2>
                    <p className="text-lg">
                        {amount} {fromCurrency} = {convertedValue.toFixed(2)} {toCurrency}
                    </p>
                </div>
            )}
            {chartData && (<div className='mb-6'>
                <Line data={chartData}/>
            </div>)}
        </div>
    )
}

export default Main