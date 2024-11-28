# Klassendiagramm: Kalender-App

## Hauptklassen und Attribute

### 1. **User** (Benutzer)
**Attributes**:  
- `userID: String`  
- `name: String`  
- `email: String`  
- `password: String` (verschlüsselt)  
- `preferences: Object`  

**Methods**:  
- `register()`  
- `login()`  
- `updatePreferences()`  

### 2. **Calendar**
**Attributes**:  
- `calendarID: String`  
- `userID: String` (Referenz zu User)  
- `events: Array` (Liste von Event-Objekten)  

**Methods**:  
- `importSchedule()`  
- `addEvent(event: Event)`  
- `generateStudyBlocks()`  

### 3. **Event**
**Attributes**:  
- `eventID: String`  
- `title: String`  
- `startTime: DateTime`  
- `endTime: DateTime`  
- `importance: String`  

**Methods**:  
- `editEvent()`  
- `deleteEvent()`  

### 4. **StudyBlock** (Lernblock)
**Attributes**:  
- `blockID: String`  
- `calendarID: String`  
- `subject: String`  
- `startTime: DateTime`  
- `endTime: DateTime`  
- `priority: String`  

**Methods**:  
- `adjustTiming()`  

### 5. **Settings** (Einstellungen)
**Attributes**:  
- `userID: String` (Referenz zu User)  
- `notifications: Boolean`  
- `theme: String`  

**Methods**:  
- `updateSettings()`  

### 6. **Exam** (Prüfung)
**Attributes**:  
- `examID: String`  
- `title: String`  
- `date: DateTime`  
- `importance: String`  

**Methods**:  
- `updateExam()`  
- `deleteExam()`  

---

## Beziehungen

- **User** hat eine **1:N Beziehung** zu **Calendar**.  
- **Calendar** hat eine **1:N Beziehung** zu **Event** und **StudyBlock**.  
- **User** hat eine **1:1 Beziehung** zu **Settings**.  
- **User** hat eine **1:N Beziehung** zu **Exam**.  

<br>
<br>

## Klassendiagramm:

![alt text](<UML Diagram-1.jpg>)