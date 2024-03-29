/* A */

SELECT PRODUCT.NMPRODUCT, SUPPLIER.NMSUPPLIER, PRODUCT.VLPRICE,
(PRODUCT.VLPRICE - (PRODUCT.VLPRICE * 0.1)) AS PRICE10,
(PRODUCT.VLPRICE - (PRODUCT.VLPRICE * 0.2)) AS PRICE20,
CASE
	WHEN (PRODUCT.VLPRICE - (PRODUCT.VLPRICE * 0.1)) > 15
	THEN (PRODUCT.VLPRICE - (PRODUCT.VLPRICE * 0.3))
	END AS PRICE30
FROM PRODUCTREQUEST
INNER JOIN CUSTOMER ON PRODUCTREQUEST.CDREQUEST = CUSTOMER.CDCUSTOMER
INNER JOIN PRODUCT ON PRODUCTREQUEST.CDPRODUCT = PRODUCT.CDPRODUCT
INNER JOIN REQUEST ON PRODUCTREQUEST.CDREQUEST = REQUEST.CDREQUEST
INNER JOIN SUPPLIER ON PRODUCTREQUEST.CDREQUEST = SUPPLIER.CDSUPPLIER
ORDER BY PRODUCT.VLPRICE, PRODUCT.NMPRODUCT;

/* B */

SELECT PRODUCT.NMPRODUCT, SUPPLIER.NMSUPPLIER, PRODUCT.VLPRICE,(PRODUCT.VLPRICE * PRODUCT.QTSTOCK) AS TOTALPRICE,
CASE
	WHEN (PRODUCT.VLPRICE * PRODUCT.QTSTOCK) > 12000
	THEN (PRODUCT.VLPRICE * (PRODUCT.QTSTOCK * 2))
	END AS DOUBLEPRICE
FROM PRODUCTREQUEST
INNER JOIN PRODUCT ON PRODUCTREQUEST.CDPRODUCT = PRODUCT.CDPRODUCT
INNER JOIN SUPPLIER ON PRODUCTREQUEST.CDREQUEST = SUPPLIER.CDSUPPLIER
ORDER BY SUPPLIER.NMSUPPLIER, PRODUCT.NMPRODUCT;

/* C */

SELECT * FROM CUSTOMER WHERE IDFONE IS NOT NULL AND NMCUSTOMER LIKE '[J]%' ORDER BY NMCUSTOMER;

/* D */

SELECT PRODUCT.NMPRODUCT, PRODUCT.VLPRICE, SUPPLIER.NMSUPPLIER 
FROM PRODUCT
INNER JOIN SUPPLIER ON PRODUCT.CDSUPPLIER = SUPPLIER.CDSUPPLIER
WHERE SUPPLIER.NMSUPPLIER LIKE '%ica%'
ORDER BY SUPPLIER.NMSUPPLIER, PRODUCT.VLPRICE;

/* E */

SELECT SUPPLIER.NMSUPPLIER, SUPPLIER.IDFONE, PRODUCT.NMPRODUCT, PRODUCT.VLPRICE,
CASE
	WHEN PRODUCT.NMPRODUCT LIKE 'S%' AND PRODUCT.VLPRICE > 50
	THEN (PRODUCT.VLPRICE * PRODUCT.QTSTOCK)
	END AS TOTALPRICE
FROM PRODUCT
INNER JOIN SUPPLIER ON PRODUCT.CDSUPPLIER = SUPPLIER.CDSUPPLIER
ORDER BY SUPPLIER.NMSUPPLIER, PRODUCT.VLPRICE;

/* F */

SELECT CUSTOMER.NMCUSTOMER, PRODUCT.NMPRODUCT, REQUEST.DTREQUEST, REQUEST.DTDELIVER, PRODUCTREQUEST.QTAMOUNT, PRODUCTREQUEST.VLUNITARY, REQUEST.VLTOTAL
FROM PRODUCTREQUEST
INNER JOIN CUSTOMER ON PRODUCTREQUEST.CDREQUEST = CUSTOMER.CDCUSTOMER
INNER JOIN PRODUCT ON PRODUCTREQUEST.CDPRODUCT = PRODUCT.CDPRODUCT
INNER JOIN REQUEST ON PRODUCTREQUEST.CDREQUEST = REQUEST.CDREQUEST
WHERE PRODUCTREQUEST.QTAMOUNT < 600 AND REQUEST.DTREQUEST BETWEEN '2003-08-01' AND '2003-08-31' AND PRODUCT.NMPRODUCT LIKE 'M%';

/* G */

SELECT CUSTOMER.NMCUSTOMER, PRODUCT.NMPRODUCT, SUPPLIER.NMSUPPLIER, REQUEST.DTREQUEST, REQUEST.DTDELIVER, PRODUCT.VLPRICE
FROM PRODUCTREQUEST
INNER JOIN CUSTOMER ON PRODUCTREQUEST.CDREQUEST = CUSTOMER.CDCUSTOMER
INNER JOIN PRODUCT ON PRODUCTREQUEST.CDPRODUCT = PRODUCT.CDPRODUCT
INNER JOIN REQUEST ON PRODUCTREQUEST.CDREQUEST = REQUEST.CDREQUEST
INNER JOIN SUPPLIER ON PRODUCTREQUEST.CDREQUEST = SUPPLIER.CDSUPPLIER
WHERE SUPPLIER.IDFONE LIKE '(011)%' AND PRODUCT.VLPRICE > 20;