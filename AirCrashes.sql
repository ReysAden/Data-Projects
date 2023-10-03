
-- Retrieve all incidents in the year 1916
SELECT * FROM aircrashesFullData$ WHERE Year = 1916;

-- Retrieve all incidents in Germany
SELECT * FROM aircrashesFullData$ WHERE [Country/Region] = 'Germany';

-- Calculate the total number of air and ground fatalities in 1916
SELECT SUM([SumofFatalities(air)]) AS TotalAirFatalities, SUM([SumofGround]) AS TotalGroundFatalities
FROM aircrashesFullData$
WHERE Year = 1916;

-- Extract the year from the "Year" column
SELECT DISTINCT Year, COUNT(*) AS IncidentCount
FROM aircrashesFullData$
GROUP BY Year
ORDER BY Year;

-- Remove "?" from "Aircraft Manufacturer" column
UPDATE aircrashesFullData$ SET "AircraftManufacturer" = REPLACE("AircraftManufacturer", '?', '');

-- Trim leading and trailing spaces from the "Operator" column
UPDATE aircrashesFullData$ SET Operator = TRIM(Operator);

-- Convert the "Country/Region" column to uppercase
UPDATE aircrashesFullData$ SET "Country/Region" = UPPER("Country/Region");
