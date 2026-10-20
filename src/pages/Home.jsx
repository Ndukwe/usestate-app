import { useState } from "react";

function Home() {
  const [hourWorked, setHourWorked] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
const [isDiscount, setIsDiscount] = useState(false);
const [isVAT, setVAT] = useState(false);

const [fixedServiceFee, setFixedServiceFee] = useState(0);
  const [additionalExpense, setAdditionalExpense] = useState(0);
 const [discountValue,setDiscountValue]=useState(0);

  //operator
  const legalRateFee = Number(hourWorked) * Number(hourlyRate);
 
  const subTotal = Number(legalRateFee) + Number(additionalExpense);
   const legalDiscount=discountValue/100 *  subTotal;
   
   const mainTotal= isDiscount?subTotal-legalDiscount:subTotal;
   const legalPlusVAT=isVAT?mainTotal *0.75:mainTotal;
 

  return (
    <>
      <main className="calculator">
        <section>
          <h1>UseState lesson {name}</h1>
          <div className="container">
            <div>
              <label>Hour worked </label>
              <input
                type="number"
                value={hourWorked}
                onChange={(event) => setHourWorked(event.target.value)}
              />
            </div>

            <div>
              <label>Hourly Rate </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
              />
            </div>
            <div>
              <label>Fixed Service Fee </label>
              <input
                type="number"
                value={fixedServiceFee}
                onChange={(event) => setFixedServiceFee(event.target.value)}
              />
            </div>

            <div>
              <label>Additional Expense </label>
              <input
                type="number"
                value={additionalExpense}
                onChange={(event) => setAdditionalExpense(event.target.value)}
              />
            </div>

            <div>
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  value={isDiscount}
                  onChange={(event) => setIsDiscount(event.target.checked)}
                />
                <label>Add Discount </label>

                <input
                  type="checkbox"
                  value={isVAT}
                  onChange={(event) => setVAT(event.target.checked)}
                />
                <label>Add VAT(7.5%) </label>
              </div>
            </div>
              {  isDiscount?
              <div>
              <label>Discount </label>
              <input
                type="number"
                value={discountValue}
                onChange={(event) => setDiscountValue(event.target.value)}
              />
            </div>:<></>  }
          </div>
        </section>
        <section>
          <h1> Legal Fee Break Down</h1>
          <p>Hour worked:{hourWorked} Hrs </p>
          <p>Hourly Rate:{hourlyRate} </p>
          <p>Fixed Service:{fixedServiceFee} </p>
          <p>Legal Discount{legalDiscount}</p>
           <p>Legal Rate Fee{legalRateFee}</p>
           <p>VAT Added {legalPlusVAT}</p>
          <p>Sub Total {mainTotal}</p>
        </section>
      </main>
    </>
  );
}

export default Home;
