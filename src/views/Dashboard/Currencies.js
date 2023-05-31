import { 
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Text,
    Flex,
    InputGroup,
    InputLeftElement,
    Input,
    FormControl,
    FormLabel,
    Select
} from '@chakra-ui/react'
import { AddIcon, EditIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url_path } from 'views/constants'
let startD = ''
let endD = ''
export default function Currencies() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [dataList, setDataList] = useState([])
    const [dataListBackup, setDataListBackup] = useState([])

    useEffect(() => {
        axios.get(`${url_path}/currencies`).then(response1 => {
            const currencyNamesList = response1.data.sort()
            axios.get(`${url_path}/users`).then(async(response) => {
                let transections = []
                let currencyList = []
                let result = []
                let today = new Date()
                today = today.toISOString().split('T')[0]
                await response.data.map(async(e) => {
                    await e.transactions.map(res =>{
                        let date = new Date(res.created_at);
                        date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date)
                        date = date.split('/')
                        let date2 = []
                        date2[0] = date[2]
                        date2[2] = date[1]
                        date2[1] = date[0]
                        date2 = date2.toString()
                        date2 = date2.replaceAll(',', '-')
                        if(date2 === today){
                            transections.push({...res})
                        }
                    })
                })
                transections.map(async(e) =>{
                    await e.transections.map(res=>{
                        currencyList.push({
                            currency: res.currency,
                            currency_rate: res.currency_rate,
                            currency_amount: res.currency_amount,
                            total_amount: res.total_amount,
                            createdAt: e.created_at,
                            trade: e.trade
                        })
                    })
                })

                currencyNamesList.map((res)=>{
                    let temp = {
                        currency_rate: 0,
                        rate_count: 0,
                        total_sale: 0,
                        total_purchase: 0,
                        total_sales_amount: 0,
                        total_purchase_amount: 0,
                    }
                   currencyList.map(e=>{
                    if(res === e.currency){
                        temp.currency_rate = temp.currency_rate + e.currency_rate
                        temp.rate_count = temp.rate_count + 1
                        if(e.trade === 'sale'){
                            temp.total_sale = temp.total_sale + e.currency_amount
                            temp.total_sales_amount = temp.total_sales_amount + e.total_amount
                        }else{
                            temp.total_purchase = temp.total_purchase + e.currency_amount
                            temp.total_purchase_amount = temp.total_purchase_amount + e.total_amount
                        }
                    }
                   })
                   result.push({
                        currency:res,
                        avg_rate: temp.currency_rate > 0 ? ((temp.currency_rate / temp.rate_count).toFixed(2)) : 0,
                        total_sale: temp.total_sale,
                        total_purchase: temp.total_purchase,
                        total: temp.total_sales_amount - temp.total_purchase_amount
                   })
                   
                })
                setDataList([...result])
                setDataListBackup([...result])
            });
        });
      }, [])

      const handleDateRange = (event)=>{
        const value = event.target.value
        const name = event.target.name
        if(name === 'startDate'){
          setStartDate(value)
          startD = value
          handleDateRangeData()
        }else if(name === 'endDate'){
          setEndDate(value)
          endD = value
          handleDateRangeData()
        }
      }
  
      const handleDateRangeData = async()=>{
        if(startD !== '' && endD !== ''){
          let start = new Date(startD)
          start = start.toISOString().split('T')[0]
          let end = new Date(endD)
          end = end.toISOString().split('T')[0]
          axios.get(`${url_path}/currencies`).then(response1 => {
            const currencyNamesList = response1.data.sort()
            axios.get(`${url_path}/users`).then(async(response) => {
                let transections = []
                let currencyList = []
                let result = []
                await response.data.map(async(e) => {
                    await e.transactions.map(res =>{
                        let date = new Date(res.created_at);
                        date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date)
                        date = date.split('/')
                        let date2 = []
                        date2[0] = date[2]
                        date2[2] = date[1]
                        date2[1] = date[0]
                        date2 = date2.toString()
                        date2 = date2.replaceAll(',', '-')
                        if(date2 >= start && date2 <= end){
                            transections.push({...res})
                        }
                    })
                })
                transections.map(async(e) =>{
                    await e.transections.map(res=>{
                        currencyList.push({
                            currency: res.currency,
                            currency_rate: res.currency_rate,
                            currency_amount: res.currency_amount,
                            total_amount: res.total_amount,
                            createdAt: e.created_at,
                            trade: e.trade
                        })
                    })
                })

                currencyNamesList.map((res)=>{
                    let temp = {
                        currency_rate: 0,
                        rate_count: 0,
                        total_sale: 0,
                        total_purchase: 0,
                        total_sales_amount: 0,
                        total_purchase_amount: 0,
                    }
                   currencyList.map(e=>{
                    if(res === e.currency){
                        temp.currency_rate = temp.currency_rate + e.currency_rate
                        temp.rate_count = temp.rate_count + 1
                        if(e.trade === 'sale'){
                            temp.total_sale = temp.total_sale + e.currency_amount
                            temp.total_sales_amount = temp.total_sales_amount + e.total_amount
                        }else{
                            temp.total_purchase = temp.total_purchase + e.currency_amount
                            temp.total_purchase_amount = temp.total_purchase_amount + e.total_amount
                        }
                    }
                   })
                   result.push({
                        currency:res,
                        avg_rate: temp.currency_rate > 0 ? ((temp.currency_rate / temp.rate_count).toFixed(2)) : 0,
                        total_sale: temp.total_sale,
                        total_purchase: temp.total_purchase,
                        total: temp.total_sales_amount - temp.total_purchase_amount
                   })
                   
                })
                setDataList([...result])
                setDataListBackup([...result])
            });
        });
        }
      }

      const filterCurrency = event =>{
        const value = event.target.value
        if(value === ''){
            setDataList([...dataListBackup])
        }else{
            const data = dataListBackup.filter((e)=>{
                return e.currency.toLowerCase().indexOf(value.toLowerCase()) > -1
            })
            setDataList(data)
        }
      }

      const filterTransactions = event => {
        const value = event.target.value
        if(value === 'all'){
            setDataList([...dataListBackup])
        }else if(value === 'profit'){
            const data = dataListBackup.filter((e)=>{
                return e.total > 0 
            })
            setDataList(data)
        }else if(value === 'lose'){
            const data = dataListBackup.filter((e)=>{
                return e.total < 0 
            })
            setDataList(data)
        }else if(value === 'both'){
            const data = dataListBackup.filter((e)=>{
                return e.total > 0 || e.total < 0 
            })
            setDataList(data)
        }
      }

  return (
    <div style={{marginTop:'6rem'}}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Text></Text>
            <Flex justifyContent={'space-between'} alignItems={'end'} gap={'0.5rem'}>
            <FormControl>
                <FormLabel>Filter Currency</FormLabel>
                <Select name="filter" onChange={filterTransactions} >
                  <option value="all">All</option>
                  <option value="profit">Profit</option>
                  <option value="lose">Lose</option>
                  <option value="both">Profit & Lose</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Search Currency</FormLabel>
                <InputGroup onChange={filterCurrency}>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Search Here' />
              </InputGroup>
              </FormControl>
              <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input type='date' name="startDate" value={startDate} onChange={handleDateRange}/>
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type='date' name="endDate" value={endDate} min={startDate} onChange={handleDateRange}/>
              </FormControl>
            </Flex>
          </Flex>
          <TableContainer style={{width: '100%', marginTop: '2rem'}}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>NO#</Th>
                  <Th>Currency</Th>
                  <Th>Average Rate</Th>
                  <Th>Purchase</Th>
                  <Th>Sales</Th>
                  <Th>Profit/Lose</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataList.length > 0 ? dataList.map((res, index) =>
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{res.currency}</Td>
                    <Td>{res.avg_rate}</Td>
                    <Td>{res.total_purchase.toLocaleString() + ' ' + res.currency}</Td>
                    <Td>{res.total_sale.toLocaleString() + ' ' + res.currency}</Td>
                    <Td fontWeight={'bold'}>
                        {res.total > 0 ? <span style={{color:'green'}}>{res.total.toLocaleString() + ' PKR'}</span> : (res.total < 0 ? <span style={{color:'red'}}>{res.total.toLocaleString() + ' PKR'}</span> : <span style={{color:'gray'}}>{0 + ' PKR'}</span>)}
                    </Td>
                  </Tr> 
                  ): <Tr>
                  <Td colspan="7">No Data Found</Td>
              </Tr>}
              </Tbody>
            </Table>
          </TableContainer>
    </div>
  )
}
