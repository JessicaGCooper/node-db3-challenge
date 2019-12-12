-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select Product.ProductName
    , Category.CategoryName
from Product 
join Category on Product.CategoryId = Category.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select [Order].Id as OrderId
    , Shipper.CompanyName as Shipper
from [Order]
join Shipper on [Order].ShipVia = Shipper.Id
where [Order].OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select OrderDetail.OrderId
    , Product.ProductName
    , OrderDetail.Quantity
from Product
join OrderDetail on Product.Id = OrderDetail.ProductId
where OrderDetail.OrderId = 10251
order by Product.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select o.Id as OrderID
    , c.CompanyName as Customer_CompanyName
    , e.LastName as Employee_LastName
from [Order] as o
join Customer as c
    on o.CustomerId = c.Id
join Employee as e
    on o.EmployeeId = e.Id;