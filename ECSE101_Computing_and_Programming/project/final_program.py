import csv
import math
import matplotlib.pyplot as plt

def getCsvData():
    dataDict ={}
    with open("__xid-18968005_1.csv", 'r') as file:
        csv_file = csv.DictReader(file)
        for row in csv_file:
            # pop to remove vehicle type and saved as variable vehicleTy to be used later (eg Buses/ Cars/ Goods & Other Vehicles/ Motorcycles/ Rental Cars/ Taxi)
          vehicleTy = row.pop('Vehicle Type')
          # get all population value and convert to integer and saved in a list as population_int
          population_int=[int(i) for i in row.values()]
          # get the row.key (the months) and zip with the population_integer then saved as dict object with the name of the vehichle as key.
          dataDict[vehicleTy] = list(zip(row.keys(),population_int))
          # example {'Buses': [('Jan', 17037), ('Feb', 17076), ('Mar', 17093), ('Apr', 17144), ('May', 17154), ('Jun', 17190), ...], 'Cars' : [('Jan', 593555), ('Feb', 594925), ('Mar', 596098),...]}
    return dataDict
    
data = getCsvData()

def showMenuOptions():
    print("\n","="*20,'Main Menu Option', "="*20)
    print('1 - View the vehicle population for motorcycles of all months in Y2012.')
    print('2 - To select a vehicle type and show the mean of the vehicle population in the 6-month span of Jan to Jun.')
    print('3 - View the months in which the vehicle population had increased by less than 5% over the previous month and the vehicle population of each of those months.')
    print('4 - View plots of difference between Taxi to Buses and Buses to Taxi vehicle population of each month.')
    print('5 - Quit program\n')

def showResultBy2Rows (tupleList):
    # each vehicle data is saved in tuple of list eg [('Jan', 146388), ('Feb', 146397), ('Mar', 146316), ...]
    # to display value and label in two difference rows, first get the value and labels and used loop to iterate
    label, population = list(zip(*tupleList))
    print(f'{"Months":<15}',end='')
    for index,mth in enumerate(list(label)):
      if index != len(label)-1:
        print(f'{mth:^10}',end='')
      else:
        print(f'{mth:^10}')
    print(f'{"Population":<15}',end='')
    for index,val in enumerate(list(population)):
      if index != len(population)-1:
        print(f'{val:^10,}',end='')
      else:
        print(f'{val:^10,}')

  
def showMotorPopulation():
  stat =  data['Motorcycles']
  print('\n[Motorcycles Population in Year 2012]\n')
  print(f'{"Month":<6} {"Population":^12}')
  for mth in stat:
      print(f'{mth[0]:<6} {mth[1]:^12,}')


def get6MthAveg(vehicleType):
  label,value = list(zip(*data[vehicleType]))
  mean=math.floor(sum(value[0:6])/6)
  newStat=[]

  for index in range(6):
    if value[index] > mean:
      newStat.append(tuple([label[index],value[index]]))
  print(f'\nThe mean of the {vehicleType}  population in the 6-month span of Jan to Jun: {mean:,}\n')
  print(f'[Months of {vehicleType} population exceed the mean mentioned above]')
  showResultBy2Rows(newStat)


def getLowGrowthMonth(vehicleType):
  label,value = list(zip(*data[vehicleType]))
  newStat=[]
  for i,item in enumerate(value):
    if i>0 and  1 < (item/value[i-1]) < 1.05:
        increasedVal = f'{item/value[i-1]*100-100:.1f}%'
        newStat.append(tuple([label[i],value[i],increasedVal]))

  print(f'\n[Months of {vehicleType} population had increased by less than 5% vs previous month]\n')
  print(f'{"Month":<6} {"Population":^12} {"Growth% vs previous month"}')
  for val in newStat:
      print(f'{val[0]:<6} {val[1]:^12,} {"+"+val[2]}')

title_font={'fontname':'Tahoma','fontsize':18}
font={'fontname':'Tahoma'}

mthT, populationTaxi = list(zip(*data['Taxi']))
mthB, populationBuses = list(zip(*data['Buses']))

def taxi_to_bus_diff():
  value_diff=[]
  for i in range(len(mthT)):
      value_diff.append(populationTaxi[i]-populationBuses[i])
  
  plt.plot(mthT, value_diff,color='turquoise',linewidth=2,marker='.')
  plt.title('Difference between Taxi vs Buses',fontdict=title_font)
  plt.xlabel('Months in 2012',fontdict=font)
  plt.ylabel('Vehicle population',fontdict=font)
  plt.show()


def show_taxi_and_bus():

    plt.plot(mthB, populationBuses, label='Bus', color='dodgerblue',linewidth=2,marker='.')
    plt.plot(mthT, populationTaxi, label='Taxi', color='tomato',linewidth=2,marker='.')
    plt.title('Difference between Taxi vs Buses',fontdict=title_font)
    plt.xlabel('Months in 2012',fontdict=font)
    plt.ylabel('Vehicle population',fontdict=font)
    plt.legend()
    plt.show()

def runProgram():
    status = True
    vehicle_type_list={'b':'Buses','c':'Cars','g':'Goods & Other Vehicles','m':'Motorcycles','r':'Rental Cars','t':'Taxi'}
    
    def showSubMenuVehicleType():    
        print(f'\n{"Input Options":^15} - {"Vehicle Type":^20}')
        for key in vehicle_type_list:
            inputKey = key + " or " + key.upper()
            print(f'{inputKey:^15} - {"for "+vehicle_type_list[key]:<20}')
        
        print(f'{"x or X":^15} - {"return to main menu":^20}\n')
        userSubSelection = input('Please enter your Vehicle Type option: ')
        return userSubSelection.lower()
        
    
    while status:
        showMenuOptions()
        userSelection = input('Please enter your choice: ')
        
        if userSelection == '1':
            showMotorPopulation()
        
        elif userSelection == '2':
            option2VehicleType = showSubMenuVehicleType()
            # loop to prompt user input till  correct input condition met
            while status and option2VehicleType:
                if option2VehicleType in vehicle_type_list:
                    get6MthAveg(vehicle_type_list[option2VehicleType])
                    break
                elif option2VehicleType == 'x':
                    break
                print("\nSorry invalid option, please re-enter your vehicle type option eg 'b' for Buses\n")
                option2VehicleType = showSubMenuVehicleType()

        elif userSelection == '3':
            
            option3VehicleType = showSubMenuVehicleType()
            # loop to prompt user input till  correct input condition met
            while status and option3VehicleType:
                if option3VehicleType in vehicle_type_list:
                    getLowGrowthMonth(vehicle_type_list[option3VehicleType])
                    break
                elif option3VehicleType == 'x':
                    break
                print("\nSorry invalid option, please re-enter your vehicle type option eg 'b' for Buses\n")
                option3VehicleType = showSubMenuVehicleType()
                
        elif userSelection == '4':
            show_taxi_and_bus()
            taxi_to_bus_diff()
            
        elif userSelection == '5':
            status=False
            print('\nQuiting program...')
            print('The end - Thank you')
        else:
            print('\nSorry invalid option, please enter your option no. from 1 to 5 only.\n')
            


runProgram()